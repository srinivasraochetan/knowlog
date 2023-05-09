import { computed, inject } from '@angular/core';
import {
    Category,
    CategoryLabel,
    LogCategory,
    LogCategoryAPIResponse,
} from '@logs/interfaces/logs.interface';
import {
    SignalStoreUpdate,
    rxEffect,
    signalStore,
    withComputed,
    withEffects,
    withHooks,
    withState,
} from '@ngrx/signals';
import { BackendService } from '@shared/services/backend.service';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

type CategoryState = {
    apiResponse: LogCategoryAPIResponse[];
    // uiData: LogCategory[];
    loading: boolean;
    selectedCategory: Category;
};

const initialState: CategoryState = {
    apiResponse: [],
    // uiData: [],
    loading: false,
    selectedCategory: 'angular',
};

export const CategoriesStore = signalStore(
    // { providedIn: 'root' },
    withState<CategoryState>(initialState),
    withComputed(({ apiResponse, selectedCategory }) => ({
        uiData: computed(() => {
            const uiData = constructCategoryUIData(apiResponse());
            const uiDataWithSelectedUpdated = toggleSelectedCategory(
                selectedCategory(),
                uiData
            );
            return uiDataWithSelectedUpdated;
        }),
    })),
    // withUpdaters(({ update, uiData }) => ({
    //     updateLoading: () => {
    //         update({ loading: false });
    //     },
    // })),
    withCategoriesEffects(),
    withHooks({
        onInit: ({ getCategories }) => getCategories(),
    })
);

function withCategoriesEffects() {
    return withEffects(({ update }: SignalStoreUpdate<CategoryState>) => {
        const backend = inject(BackendService);
        return {
            // We can use `rxEffect` to create side effects by using RxJS APIs.
            // However, that's not mandatory. We can also create effects without RxJS:
            async loadAllCategories() {
                update({ loading: true });
                const response = await backend.Get('getCategories');
                response.subscribe((data: LogCategoryAPIResponse[]) => {
                    update({ apiResponse: [...data], loading: false });
                });
            },
            getCategories: rxEffect<void>(
                pipe(
                    tap(() => update({ loading: true })),
                    switchMap(() =>
                        backend.Get('getCategories').pipe(
                            map(response =>
                                update({
                                    apiResponse: [...response],
                                    loading: false,
                                })
                            ),
                            catchError(() =>
                                of(
                                    update({
                                        apiResponse: [
                                            {
                                                id: 1,
                                                name: 'Failed to retrieve data',
                                            },
                                        ],
                                        loading: false,
                                    })
                                )
                            )
                        )
                    )
                )
            ),
            addCategory: rxEffect<{ categoryName: Category }>(
                pipe(
                    switchMap(category =>
                        backend
                            .Post('addCategory', {
                                name: category.categoryName,
                            })
                            .pipe(
                                map(response =>
                                    update(state => ({
                                        apiResponse: [
                                            ...state.apiResponse,
                                            response,
                                        ],
                                    }))
                                ),
                                catchError(() => of(console.log('Failed')))
                            )
                    )
                )
            ),
            deleteCategory: rxEffect<{ categoryId: number }>(
                pipe(
                    switchMap(category =>
                        backend
                            .Delete('deleteCategory', null, undefined, {
                                id: category.categoryId,
                            })
                            .pipe(
                                map(response =>
                                    update(state => ({
                                        apiResponse: [
                                            ...state.apiResponse,
                                            response,
                                        ],
                                    }))
                                ),
                                catchError(() => of(console.log('Failed')))
                            )
                    )
                )
            ),
        };
    });
}

const constructCategoryUIData = (
    apiData: LogCategoryAPIResponse[]
): LogCategory[] => {
    return apiData.reduce(
        (uiDataAccum: LogCategory[], data: LogCategoryAPIResponse) => {
            uiDataAccum.push({
                id: data.id.toString(),
                label: data.name as CategoryLabel,
                value: data.name.toLowerCase() as Category,
                selected: false,
            });
            return uiDataAccum;
        },
        []
    );
};

const toggleSelectedCategory = (
    selectedCategory: Category,
    logCategories: LogCategory[] = []
): LogCategory[] => {
    return logCategories.reduce(
        (categoryAccum: LogCategory[], category: LogCategory) => {
            category.selected = category.value === selectedCategory;
            categoryAccum.push(category);
            return categoryAccum;
        },
        []
    );
};

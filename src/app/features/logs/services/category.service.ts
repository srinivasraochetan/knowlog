/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
    Category,
    CategoryLabel,
    LogCategory,
    LogCategoryAPIResponse,
} from '@logs/interfaces/logs.interface';
import { Observable, delay, of } from 'rxjs';

const categoriesMock: LogCategoryAPIResponse[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'React' },
    { id: 5, name: 'Blazer' },
];

@Injectable()
export class CategoryService {
    getCategories(): Promise<LogCategoryAPIResponse[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve([...categoriesMock]), 1000);
        });
    }

    generateCategoryUIData(
        apiData: LogCategoryAPIResponse[]
    ): Observable<LogCategory[]> {
        return of(this.constructCategoryUIData(apiData)).pipe(delay(1000));
    }

    constructCategoryUIData(apiData: LogCategoryAPIResponse[]): LogCategory[] {
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
    }
}

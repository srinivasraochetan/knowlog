/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    DestroyRef,
    EffectRef,
    Injector,
    Input,
    Signal,
    WritableSignal,
    computed,
    effect,
    inject,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterModule,
} from '@angular/router';
import { Category, LogCategory } from '@logs/interfaces/logs.interface';
import { CategoryService } from '@logs/services/category.service';
import { LogsService } from '@logs/services/logs.service';
import { CategoriesStore } from '@logs/store/categories.store';
import { AlertsComponent } from '@shared/components/alerts/alerts.component';
import { TrackVisibilityDirective } from '@shared/directives/track-visibility.directive';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-logs',
    standalone: true,
    // signals: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AlertsComponent,
        TrackVisibilityDirective,
    ],
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
    providers: [LogsService, CategoryService, CategoriesStore],
})
export class LogsComponent {
    @Input() defaultPath?: string = 'angularCategory'; // this will come from the route data
    readonly categoriesStore = inject(CategoriesStore);
    logCategories: WritableSignal<LogCategory[]> = signal<LogCategory[]>([]);
    showLoader: WritableSignal<boolean> = signal<boolean>(true);
    displayContent: Signal<boolean> = computed(
        () => this.logCategories().length === 0
    ); // keep this for demo
    newCategory: Category = '';
    deleteCategory: Category = 'ignore';

    allSubscriptions: Subscription[] = [];
    allEffectReferences: EffectRef[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private logsService: LogsService,
        private categoryService: CategoryService,
        private cdr: ChangeDetectorRef,
        private injector: Injector
    ) {
        inject(DestroyRef).onDestroy(() => {
            this.allSubscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
            this.allEffectReferences.forEach(effectReference =>
                effectReference.destroy()
            ); // This line is not required actually, but I kept it for my satisfaction
        });
        this.subscriptionEngine();
        this.effectReferenceEngine(); // effect needs to be run in injection context (constructor time) because it is injecting DestroyRef behind the scenes to provide self clean-up out of the box
    }

    effectReferenceEngine(): void {
        const effectReference = effect(
            () => {
                console.log(this.showLoader());
                console.log(this.logCategories());
            },
            { injector: this.injector }
        );

        this.allEffectReferences.push(effectReference);
    }

    subscriptionEngine(): void {
        const routerEventSub = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('Category')) {
                    const pathName: string =
                        this.logsService.getCategoryPathNameFromUrl(event.url);
                    const category: Category =
                        this.logsService.getCategoryFromPathName(pathName);
                    this.categoriesStore.update({ selectedCategory: category });
                } else {
                    this.navigate(this.defaultPath as string);
                }
            }
        });

        this.allSubscriptions.push(routerEventSub);
    }

    onCategoryChange(event: any): void {
        this.categoriesStore.update({
            selectedCategory: event.currentTarget?.value,
        });
        this.navigate(`${this.categoriesStore.selectedCategory()}Category`);
    }

    navigate(path: string): void {
        this.router.navigate([path], {
            relativeTo: this.route,
        });
    }

    onAddNewCategory(): void {
        this.categoriesStore.addCategory({ categoryName: this.newCategory });
        this.newCategory = '';
    }

    onDeleteCategoryChange(event: any): void {
        this.deleteCategory = event.currentTarget.value;
    }

    onDeleteCategory(): void {
        const uiData = this.categoriesStore.uiData();
        const idToBeDeleted = uiData.filter(
            data => data.value === this.deleteCategory
        )[0].id;
        console.log(idToBeDeleted);
        this.categoriesStore.deleteCategory({
            categoryId: parseInt(idToBeDeleted, 10),
        });
        this.deleteCategory = 'ignore';
    }
}

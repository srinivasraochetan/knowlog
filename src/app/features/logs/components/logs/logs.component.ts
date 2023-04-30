import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, inject } from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterModule,
} from '@angular/router';
import { logCategories } from '@logs/constants/logs.constant';
import { Category, LogCategory } from '@logs/interfaces/logs.interface';
import { LogsService } from '@logs/services/logs.service';
import { AlertsComponent } from '@shared/components/alerts/alerts.component';
import { TrackVisibilityDirective } from '@shared/directives/track-visibility.directive';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-logs',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        AlertsComponent,
        TrackVisibilityDirective,
    ],
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
    providers: [LogsService],
})
export class LogsComponent {
    @Input() defaultPath?: string = 'angularCategory'; // this will come from the route data
    logCategories: LogCategory[] = [...logCategories];
    showLoader = true;

    allSubscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private logsService: LogsService
    ) {
        inject(DestroyRef).onDestroy(() => {
            this.allSubscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        });
        this.subscriptionEngine();
    }

    subscriptionEngine(): void {
        const routerEventSub = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log(event.url);
                if (event.url.includes('Category')) {
                    const pathName: string =
                        this.logsService.getCategoryPathNameFromUrl(event.url);
                    const category: Category =
                        this.logsService.getCategoryFromPathName(pathName);
                    this.toggleSelectedCategory(category);
                } else {
                    this.navigate(this.defaultPath as string);
                }
                this.showLoader = false;
            }
        });

        this.allSubscriptions.push(routerEventSub);
    }

    onCategoryChange(event: any): void {
        this.toggleSelectedCategory(event.target.value);
        this.navigate(`${event.target.value}Category`);
    }

    toggleSelectedCategory(category: Category): void {
        this.logCategories = [
            ...this.logsService.toggleSelectedCategory(
                category,
                this.logCategories
            ),
        ];
    }

    navigate(path: string): void {
        this.router.navigate([path], {
            relativeTo: this.route,
        });
    }
}

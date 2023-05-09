import { ApplicationRef, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Know-Log';
    // private readonly onDestroy$: Subject<void> = new Subject<void>();

    allSubscriptions: Subscription[] = [];

    constructor(router: Router, applicationRef: ApplicationRef) {
        // this.zonelessRouterStarter(router, applicationRef);
    }

    private zonelessRouterStarter(
        router: Router,
        applicationRef: ApplicationRef
    ): void {
        router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                // takeUntil(this.onDestroy$),
                takeUntilDestroyed()
            )
            .subscribe(() => {
                applicationRef.tick();
            });
    }

    // ngOnDestroy(): void {
    //     this.onDestroy$.next();
    //     this.onDestroy$.complete();
    // }
}

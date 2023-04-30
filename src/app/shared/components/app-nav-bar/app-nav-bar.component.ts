/* eslint-disable @angular-eslint/no-input-rename */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { appNavTabs } from '@shared/constants/nav-tabs.constant';
import { NavTab } from '@shared/interfaces/generic.interface';
import { NavTabService } from '@shared/services/nav-tab.service';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './app-nav-bar.component.html',
    styleUrls: ['./app-nav-bar.component.scss'],
    providers: [NavTabService],
})
export class AppNavBarComponent {
    @Input({ required: true }) title!: string;

    navTabs: NavTab[] = [...appNavTabs];

    constructor(private navTabService: NavTabService, private router: Router) {}

    toggleActive(navTab: NavTab): void {
        this.navTabs = [
            ...this.navTabService.toggleActive(navTab, this.navTabs),
        ];
    }

    onCreateNewLog(): void {
        this.router.navigate(['newLog']);
        this.navTabs = [...this.navTabService.inactivateAllTabs(this.navTabs)];
    }
}

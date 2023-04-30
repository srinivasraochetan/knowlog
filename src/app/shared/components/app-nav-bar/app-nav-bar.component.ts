/* eslint-disable @angular-eslint/no-input-rename */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-app-nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app-nav-bar.component.html',
    styleUrls: ['./app-nav-bar.component.scss'],
})
export class AppNavBarComponent {
    @Input({ required: true }) title!: string;
}

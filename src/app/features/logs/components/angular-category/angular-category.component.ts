import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogListComponent } from '@shared/components/log-list/log-list.component';

@Component({
    selector: 'app-angular-category',
    standalone: true,
    imports: [CommonModule, RouterModule, LogListComponent],
    templateUrl: './angular-category.component.html',
    styleUrls: ['./angular-category.component.scss'],
})
export class AngularCategoryComponent {}

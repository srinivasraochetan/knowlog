import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-angular-category',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './angular-category.component.html',
    styleUrls: ['./angular-category.component.scss'],
})
export class AngularCategoryComponent {}

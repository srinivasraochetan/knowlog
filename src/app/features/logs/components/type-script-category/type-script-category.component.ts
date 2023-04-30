import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-type-script-category',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './type-script-category.component.html',
    styleUrls: ['./type-script-category.component.scss'],
})
export class TypeScriptCategoryComponent {}

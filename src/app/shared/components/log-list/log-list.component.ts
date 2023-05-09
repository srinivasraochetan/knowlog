import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-log-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent {}

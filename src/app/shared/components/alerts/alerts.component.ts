/* eslint-disable @angular-eslint/no-input-rename */

import { CommonModule } from '@angular/common';
import {
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject,
} from '@angular/core';
import { AlertType } from '@shared/interfaces/generic.interface';

@Component({
    selector: 'app-alerts',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
    @Input({ required: true }) alertMessage!: string;
    @Input({ required: true }) alertType: AlertType = 'warning';
    @Output() emitClosureConfirmation: EventEmitter<boolean> =
        new EventEmitter();

    alertClass = 'alert alert-warning';

    constructor() {
        inject(DestroyRef).onDestroy(() => {
            this.alertClass = 'alert alert-warning';
            this.alertMessage = '';
            this.alertType = 'warning';
        });
    }

    ngOnInit(): void {
        this.alertClass = `alert alert-${this.alertType} alert-dismissible`;
    }

    onClose(): void {
        this.emitClosureConfirmation.next(true);
    }
}

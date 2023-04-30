import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-knowledge-log',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './knowledge-log.component.html',
    styleUrls: ['./knowledge-log.component.scss'],
})
export class KnowledgeLogComponent {
    @Input() query?: string;
    @Input() id?: string;
    @Input() category?: string;
    // @Input() logData?: unknown;
}

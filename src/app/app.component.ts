import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class AppComponent {
    title = 'Knowledge Logger';
    editorElement!: any;

    allSubscriptions: Subscription[] = [];
}

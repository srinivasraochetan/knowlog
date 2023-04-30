import { Route } from '@angular/router';
import { KnowledgeLogComponent } from '@shared/components/knowledge-log/knowledge-log.component';
import { AngularCategoryComponent } from './components/angular-category/angular-category.component';
import { LogsComponent } from './components/logs/logs.component';
import { TypeScriptCategoryComponent } from './components/type-script-category/type-script-category.component';

export const LOG_ROUTES: Route[] = [
    {
        path: '',
        component: LogsComponent,
        data: { defaultPath: 'angularCategory' },
        children: [
            {
                path: 'angularCategory',
                component: AngularCategoryComponent,
                children: [
                    {
                        path: ':id',
                        component: KnowledgeLogComponent,
                        data: { category: 'angular' },
                        // resolve: { logData: AngularLogDataResolver }
                    },
                ],
            },
            {
                path: 'typescriptCategory',
                component: TypeScriptCategoryComponent,
                children: [
                    {
                        path: ':id',
                        component: KnowledgeLogComponent,
                        data: { category: 'typescript' },
                        // resolve: { logData: TypeScriptLogDataResolver }
                    },
                ],
            },
        ],
    },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/logs', pathMatch: 'full' },
    {
        path: 'logs',
        loadChildren: () =>
            import('@logs/logs.routing').then(mod => mod.LOG_ROUTES),
    },
    {
        path: 'newLog',
        loadComponent: () =>
            import(
                '@createNew/components/create-new-log/create-new-log.component'
            ).then(mod => mod.CreateNewLogComponent),
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}

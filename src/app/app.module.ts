import {
    APP_INITIALIZER,
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '@shared/services/backend.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavBarComponent } from './shared/components/app-nav-bar/app-nav-bar.component';

export const appInitializerFactory = (backend: BackendService) => {
    return () => {
        Promise.resolve(true).then(() => backend.readBaseConfig());
    };
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AppNavBarComponent,
    ],
    providers: [
        BackendService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [BackendService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

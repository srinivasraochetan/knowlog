import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense(
    'ORg4AjUWIQA/Gnt2VFhhQlJBfVpdX2tWfFN0RnNQdV10flFFcDwsT3RfQF5jTXxbdERgUXxWc3ZUQg=='
);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

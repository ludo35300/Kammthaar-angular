import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

registerLocaleData(fr.default);

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
}).catch(err => console.error(err));

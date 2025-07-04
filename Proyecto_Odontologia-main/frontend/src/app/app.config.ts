import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Para HttpClient en servicios
    provideRouter(routes), // Solo una vez
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay())
  ]
};
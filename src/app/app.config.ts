import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';

import { routes } from './app.routes';
import { AppTitleRoute } from './title.route';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideLottieOptions({
      player: () => import('lottie-web'),
    }),

    {
      provide: TitleStrategy,
      useClass: AppTitleRoute
    }
  ]
};
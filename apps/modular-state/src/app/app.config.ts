import {
  ApplicationConfig,
  // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
  ],
};

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

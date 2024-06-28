import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@modular-state/combined').then((m) => m.CombinedComponent),
  },
  {
    path: 'wizard',
    loadComponent: () =>
      import('@modular-state/wizard').then((m) => m.WizardComponent),
  },
  {
    path: '*',
    redirectTo: '',
  },
];

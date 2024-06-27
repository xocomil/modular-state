import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@modular-state/combined').then((m) => m.CombinedComponent),
  },
  {
    path: '*',
    redirectTo: '',
  },
];

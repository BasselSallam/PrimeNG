import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainLayoutComponent,
    loadChildren: () =>
      import('./pages/dashboard/pages.routes').then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: 'auth',
    loadComponent: () => AuthLayoutComponent,
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((mod) => mod.AUTH_ROUTES),
  },
];

import { Routes } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { sessionGuard } from './auth/guards/session.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'login',
    providers: [AuthService],
    canMatch: [sessionGuard],
    loadComponent: () =>
      import('./auth/pages/login/login.component').then(
        (comp) => comp.LoginComponent
      ),
  },
  {
    path: 'register',
    providers: [AuthService],
    canMatch: [sessionGuard],
    loadComponent: () =>
      import('./auth/pages/register/register.component').then(
        (comp) => comp.RegisterComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (comp) => comp.PageNotFoundComponent
      ),
  },
];

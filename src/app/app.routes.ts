import { Routes } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { ServiceService } from './service/services/service.service';
import { sessionGuard } from './auth/guards/session.guard';
import { loggedInGuard } from './service/guards/loggedInGuard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  },  {
    path: 'client',
    providers: [AuthService,ServiceService],
    canMatch: [loggedInGuard],
    loadComponent: () =>
      import('./service/pages/client/client.component').then(
        (comp) => comp.ClientComponent
      ),
  },{
    path: 'worker',
    providers: [AuthService,ServiceService],
    canMatch: [loggedInGuard],
    loadComponent: () =>
      import('./service/pages/worker/worker.component').then(
        (comp) => comp.WorkerComponent
      ),
  },  {
    path: 'client/solicitar',
    providers: [AuthService,ServiceService],
    canMatch: [loggedInGuard],
    loadComponent: () =>
      import('./service/pages/create-service/create-service.component').then(
        (comp) => comp.CreateServiceComponent
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

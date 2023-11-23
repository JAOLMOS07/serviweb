import { Routes } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { ServiceService } from './service/services/service.service';
import { sessionGuard } from './auth/guards/session.guard';
import { loggedInGuard } from './service/guards/loggedInGuard';
import { AdminService } from './admin/services/admin.service';
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
  },
  {
 path: 'worker/postularse/:serviceId',
  providers: [AuthService,ServiceService],
  /* canMatch: [loggedInGuard], */
  loadComponent: () =>
    import('./service/pages/postulate/postulate.component').then(
      (comp) => comp.PostulateComponent
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
  },{
    path: 'client/applicants/:serviceId',
     providers: [AuthService,ServiceService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./service/pages/view-applicants/view-applicants.component').then(
         (comp) => comp.ViewApplicantsComponent
       ),
   },{
    path: 'client/voucher/:serviceId',
     providers: [AuthService,ServiceService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./service/pages/voucher-info/voucher-info.component').then(
         (comp) => comp.VoucherInfoComponent
       ),
   },{
    path: 'client/proceso/:serviceId',
     providers: [AuthService,ServiceService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./service/pages/service-process/service-process.component').then(
         (comp) => comp.ServiceProcessComponent
       ),
   },{
    path: 'worker/proceso/:serviceId',
     providers: [AuthService,ServiceService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./service/pages/service-process/service-process.component').then(
         (comp) => comp.ServiceProcessComponent
       ),
   },{
    path: 'client/services',
     providers: [AuthService,ServiceService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./service/pages/services/services.component').then(
         (comp) => comp.ServicesComponent
       ),
   },{
    path: 'worker/services',
     providers: [AuthService,ServiceService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./service/pages/services-worker/services-worker.component').then(
         (comp) => comp.ServicesWorkerComponent
       ),
   },{
    path: 'admin/vouchers',
     providers: [AuthService,AdminService],
     /* canMatch: [loggedInGuard], */
     loadComponent: () =>
       import('./admin/pages/veryfy-vouchers/veryfy-vouchers.component').then(
         (comp) => comp.VeryfyVouchersComponent
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

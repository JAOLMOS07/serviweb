import { CanActivateFn, CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Credentials, Token, User } from '../../auth/user';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (Object.entries(authService.getToken()).length !== 0) {

    return authService.validateToken().pipe(
      map((resp: any) => resp !== true),
      catchError((err) => {
        authService.deleteToken();
        console.log('Debe Iniciar sesión', err);
        router.navigateByUrl('login');
        return of(false);
      })
    );
  } else {
    console.log('Bienvenido, puede iniciar Sesión.');
    router.navigateByUrl('login');

    return of(false);
  }
};

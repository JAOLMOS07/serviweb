import { CanActivateFn, CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';

export const sessionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (Object.entries(authService.getToken()).length !== 0) {

    return authService.validateToken().pipe(
      catchError((err) => {
        authService.deleteToken();
        console.log('Debe Iniciar sesión', err);

        return of(true);
      })
    );
  } else {
    console.log('Bienvenido, puede iniciar Sesión.');
    return of(true);
  }
};

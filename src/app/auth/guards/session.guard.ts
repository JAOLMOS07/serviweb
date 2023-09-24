import { CanActivateFn, CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials, Token, User } from '../user';
import { Observable, catchError, map, of } from 'rxjs';

export const sessionGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  var token = { token: authService.getToken() };


  if (Object.entries(authService.getToken()).length !== 0) {
    return authService.validateToken(token).pipe(
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

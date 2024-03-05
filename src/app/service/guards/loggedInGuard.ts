import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { catchError, map, of } from "rxjs";
import { Router } from "@angular/router";
import { SessionService } from "../../auth/services/session.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sessionService = inject(SessionService);

  if (sessionService.isLoggedIn()) {
    return authService.validateToken().pipe(
      map((resp: any) => resp !== true),
      catchError((err) => {
        authService.deleteToken();
        console.log("Debe Iniciar sesión", err);
        router.navigateByUrl("login");
        return of(false);
      })
    );
  } else {
    console.log("Bienvenido, puede iniciar Sesión.");
    router.navigateByUrl("login");

    return of(false);
  }
};

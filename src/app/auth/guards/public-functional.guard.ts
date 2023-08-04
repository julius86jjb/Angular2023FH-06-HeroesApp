import { inject } from '@angular/core';
import { CanMatchFn,CanActivateFn,Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuth) => {
      console.log({isAuth});
      if (isAuth) router.navigate(['./']);
    }),
    map( (isAuth) => !isAuth)
  );
};

export const publicGuardMatch: CanMatchFn = () => {
  return checkAuthStatus();
};

export const publicGuardActivate: CanActivateFn = () => {
  return checkAuthStatus();
}

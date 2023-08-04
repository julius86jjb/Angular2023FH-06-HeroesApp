import { inject } from '@angular/core';
import { CanMatchFn, CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuth) => {
      console.log({isAuth});
      if (!isAuth) router.navigate(['/auth']);
    })
  );
};

export const authGuardMatch: CanMatchFn = () => {
  return checkAuthStatus();
};

export const authGuardActivated: CanActivateFn = () => {
  return checkAuthStatus();
}

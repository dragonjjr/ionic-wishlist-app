import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  // Declare for initialization dependencies injected
  const authService = inject(Auth);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

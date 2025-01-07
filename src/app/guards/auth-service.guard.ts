import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const permission = inject(PermissionService);
  return permission.isAuthUser();
};

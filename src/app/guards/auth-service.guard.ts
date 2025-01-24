import { CanActivateFn } from '@angular/router'; // Import the CanActivateFn interface for route guards
import { PermissionService } from '../services/permission.service'; // Import the PermissionService to check authentication
import { inject } from '@angular/core'; // Import the inject function for dependency injection

// Auth guard to restrict access to routes based on user authentication
export const authGuard: CanActivateFn = (route, state) => {
  const permission = inject(PermissionService);// Inject the PermissionService to access authentication methods
  return permission.isAuthUser(); // Check if the user is authenticated
};

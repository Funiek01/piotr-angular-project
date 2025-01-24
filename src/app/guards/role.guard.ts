import { CanActivateFn } from '@angular/router'; // Import the CanActivateFn interface for route guards

// Role guard to restrict access to routes based on user roles
export const roleGuard: CanActivateFn = (route, state) => {
  // This function currently allows access to all routes unconditionally
  return true;
};

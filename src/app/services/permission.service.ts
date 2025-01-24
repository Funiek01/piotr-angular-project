import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public storageService: StorageService) { }

  // Checks if the current user has one of the specified roles
  hasRole(roles: string[]): boolean {
    const userStorageObject = this.storageService.get('user'); // Retrieves the user object from localStorage
    if (userStorageObject) {
      return roles.includes(userStorageObject.role); // Checks if user's role is in the provided roles array
    } else {
      return false; // If no user object is found, return false
    }
  }

  // Checks if the user is authenticated by verifying the presence of a token in localStorage
  isAuthUser(): boolean {
    const token = this.storageService.get('token'); // Retrieves the authentication token from localStorage
    return !!token; // Returns true if the token exists, otherwise false
  }

}

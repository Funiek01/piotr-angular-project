import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public storageService: StorageService) { }

  hasRole(roles:string[]){
    const userStorageObject = this.storageService.get('user');
    if(userStorageObject){
      return roles.includes(userStorageObject.role);
    }
    else{
      return false;
    }
  }

  isAuthUser():boolean{
    const token = this.storageService.get('token');
    return !!token;
  }

}

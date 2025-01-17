import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PermissionService } from '../../services/permission.service';
import { User } from '../../models/user';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LoginComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user?: User;
  constructor(public permission:PermissionService, private storageService: StorageService){

  }

  ngOnInit(): void{
    this.user = this.storageService.get('user')

  }


  isLoggedIn(): boolean {
    return this.permission.isAuthUser();
  }

  logout(): void {
    this.permission.storageService.remove('user');
    this.permission.storageService.remove('token');
  }

}

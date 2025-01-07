import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PermissionService } from '../../services/permission.service';

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
  constructor(private permission:PermissionService){

  }

  isLoggedIn(): boolean {
    return this.permission.isAuthUser();
  }

  logout(): void {
    this.permission.storageService.remove('user');
    this.permission.storageService.remove('token');
  }

}

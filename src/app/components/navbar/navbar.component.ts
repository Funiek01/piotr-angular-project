import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PermissionService } from '../../services/permission.service';
import { User } from '../../models/user';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LoginComponent, // Login component dependency
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user?: User; // Holds user data if logged in

  constructor(
    public permission: PermissionService, // Permission service for role-based features
    private storageService: StorageService // Service for local storage access
  ) {}

  ngOnInit(): void {
    // Load the user data from storage on initialization
    this.user = this.storageService.get('user');
  }

  isLoggedIn(): boolean {
    // Checks if the user is authenticated
    return this.permission.isAuthUser();
  }

  logout(): void {
    // Removes user and token data from storage
    this.permission.storageService.remove('user');
    this.permission.storageService.remove('token');
  }

  noPermission(): void {
    // Displays an alert for unauthorized actions
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You do not have permission, first sign in',
    });
  }
}

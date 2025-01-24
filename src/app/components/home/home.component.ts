import { Component } from '@angular/core';
import { User } from '../../models/user'; 
import { StorageService } from '../../services/storage.service';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user?: User; // Holds the user data fetched from the storage service

  constructor(
    private storageService: StorageService, // Injected service for managing storage
    public permission: PermissionService // Injected service for handling user authentication and permissions
  ) {}

  ngOnInit(): void {
    // Lifecycle hook that runs when the component is initialized

    // Fetch the user data from the storage service and assign it to the `user` property
    this.user = this.storageService.get('user');
  }

  isLoggedIn(): boolean {
    // Method to check if a user is authenticated
    return this.permission.isAuthUser(); // Calls the permission service to check the authentication flag
  }
}

import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userId: string | null = ''; // Stores the user ID from the route
  userDetails?: User; // Stores details of the user
  routerSubscription?: Subscription; // Subscription for router events to detect navigation changes

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService // Future improvements
  ){}

  ngOnInit(): void {
    // Retrieve the user ID from the current route
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getUserDetails(); // Fetch user details if the ID exists
    }

    // Subscribe to router events to handle dynamic navigation changes
    if (!this.routerSubscription) {
      this.routerSubscription = this.router.events.subscribe(eventResult => {
        console.log('Event result: ', eventResult);

        // Reload user details when navigating to a user details view
        if (eventResult instanceof NavigationEnd && eventResult.url.includes('/users/view/')) {
          this.userId = this.activatedRoute.snapshot.paramMap.get('id');
          if (this.userId) {
            this.getUserDetails();
          }
        }
      });
    }
  }

  // Fetches user details from the API based on the user ID
  getUserDetails(): void {
    this.apiService.request('getUserDetails', 'get', undefined, this.userId).subscribe(result => {
      console.log('Get user details: ', result);
      this.userDetails = result; // Store the fetched user details
    });
  }

  // Unsubscribe from the router events to prevent memory leaks
  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}

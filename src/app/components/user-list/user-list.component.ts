import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { PermissionService } from '../../services/permission.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { DTO } from '../../models/dto';
import { UserDetailsComponent } from "../user-details/user-details.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CommonModule, UserDetailsComponent, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userList: User[] = []; // List of all users fetched from the API
  filterUserList: User[] = []; // Filtered list of users based on search input
  searchText: string = ''; // Text input used for searching users

  // List of colors for user initials background
  readonly colors = ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];

  constructor(
    public permissionService: PermissionService, // Handles role-based permissions
    private apiService: ApiService // Service to contact with the API
  ) {}

  // Lifecycle hook that runs after component initialization
  ngOnInit(): void {
    this.getUsers(); // Fetch all users
  }

  // Fetches the list of users from the API
  getUsers(): void {
    this.apiService.request<DTO<User[]>>('userList', 'get').subscribe((users: DTO<User[]>) => {
      this.userList = users['data']; // Populate user list
      this.filterUserList = this.userList; // Initialize filtered list
    });
  }

  // Returns the first letter of the user's first name in uppercase
  getInitials(name: string): string {
    return name[0].toUpperCase();
  }

  // Returns a background color based on the user's index in the list
  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  // Filters the user list based on the search input
  searchUser(): void {
    console.log("searchText:", this.searchText);
    const text = this.searchText.toLocaleLowerCase();
    this.filterUserList = this.userList; // Reset to the full list before filtering

    if (this.searchText) {
      this.filterUserList = this.userList.filter(user => {
        return (
          user.first_name.toLocaleLowerCase().includes(text) || // Match by first name
          user.username.toLocaleLowerCase().includes(text) // Match by username
        );
      });
      console.log("filter user list:", this.filterUserList);
    }
  }

  // Clears the search input and resets the filtered list
  clearSearch(): void {
    this.searchText = '';
    this.searchUser();
  }
}

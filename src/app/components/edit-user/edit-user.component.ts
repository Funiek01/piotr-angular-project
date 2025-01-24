import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  userId: string | null = ''; // Holds the user ID retrieved from the route parameter
  registrationForm?: FormGroup; // Form group for the user form
  userDetails?: User; // Object to store the details of the user

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lifecycle hook that runs when the component is initialized
    this.userId = this.activatedRoute.snapshot.paramMap.get('id'); // Retrieve the user ID from the route parameter
    console.log('User id:', this.userId);

    // Fetch user details if a valid user ID is provided
    if (this.userId) {
      this.getUser();
    }

    // Initialize the registration form with validators for each of element
    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getUser() {
    // Method to fetch user details from the server
    this.apiService
      .request('getUserDetails', 'get', undefined, this.userId) // API call to get user details
      .subscribe(result => {
        console.log('Get user data: ', result);
        if (result) {
          // If data is returned, populate the form with user details
          this.registrationForm?.patchValue(result);
          this.userDetails = result; // Store the user details in the component
        }
      });
  }

  editUser() {
    // Method to update the user details
    this.apiService
      .request('editUserDetails', 'put', this.registrationForm?.value, this.userId) // API call to update user details
      .subscribe(result => {
        console.log(result);
        if (result) {
          // Display success message using SweetAlert2 as a popup
          Swal.fire('Success', 'Your User details has been updated', 'success').then(swalResult => {
            console.log('Swal Result', swalResult);
            if (swalResult.value) {
              // Navigate to the home page after confirmation
              this.router.navigate(['/home']);
            }
          });
        }
      });
  }
}

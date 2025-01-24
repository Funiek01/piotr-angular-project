import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterLink,        
    CommonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationForm?: FormGroup; // Form group for registration form
  showPassword: boolean = false; // Toggle for password visibility
  showConfirmPassword: boolean = false; // Toggle for confirm password visibility

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize the form with default values and validators
    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    }, { validators: this.checkPassword }); // Add custom password matching validator
  }

  // Custom validator to ensure password and confirm password match
  checkPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;
    return password === confirm_password ? null : { notSame: true }; // Return error if passwords doesn't match
  }

  // Function to handle form submission
  register() {
    this.apiService.request('registration', 'post', this.registrationForm?.value).subscribe({
      next: (result) => {
        console.log('Registration successful');
        if (result) {
          // Show success alert and navigate to login
          Swal.fire('Success', 'Registered successfully', 'success').then((swalResult) => {
            console.log('Swal result', swalResult);
            if (swalResult.value) {
              this.router.navigate(['/login']);
            }
          });
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        if (error.status === 400) {
          // Show error alert for existing user
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User with given credentials already exists!',
          });
        } else {
          // Show generic error alert
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      },
    });
  }

  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

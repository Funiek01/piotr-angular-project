import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { PermissionService } from '../../services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false; // Toggles password visibility (for an eye)
  loginForm?: FormGroup; // Form group for login form
  isLogin: boolean = false; // Tracks if the user is logged in
  user: any; // Stores the current user data

  constructor(
    // Injecting required functionalities
    private apiService: ApiService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    public permission: PermissionService,
  ) {}

  ngOnInit(): void {
    // Initialize the login form with validation rules
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Check if a user is already logged in
    this.user = this.storageService.get('user');
    if (this.user) {
      this.isLogin = true;
    }
  }

  togglePassword(): void {
    // Toggles the password input field between text and password types
    this.showPassword = !this.showPassword;
  }

  login(): void {
    // Logs in the user
    console.log(this.loginForm);
    this.apiService.request('login', 'post', this.loginForm?.value).subscribe({
      next: (result) => {
        // Successful login
        console.log('Successfully logged in');
        if (result) {
          // Save token and user details in storage
          this.storageService.set('token', result['token']);
          this.storageService.set('user', result['user']);
          this.isLogin = true;
          Swal.fire('Success', 'Logged in successfully', 'success').then((swalResult) => {
            console.log('Swal result', swalResult);
          });
        }
      },
      error: (error) => {
        // Handle errors
        console.error('Login error:', error);
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You provided wrong credentials',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User with given credentials does not exist!',
          });
        }
      },
    });
  }
}

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
  registrationForm?: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    }, {validators:this.checkPassword})
  }

  checkPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;
    return password === confirm_password ? null : { notSame: true }
  }

  register() {
    this.apiService.request('registration', 'post', this.registrationForm?.value).subscribe({
      next: (result) => {
        console.log('Registration successful');
        if (result) {
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User with given credentials already exists!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      },
    });
  }
  


  togglePassword():void{
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword():void{
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
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
  userId: string | null = '';
  registrationForm?: FormGroup
  userDetails? : User;
  constructor(private formBuilder: FormBuilder, private activatedRoute : ActivatedRoute, private apiService:ApiService, private router: Router){};

  ngOnInit(): void{
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('User id:',this.userId);

    if(this.userId){
      this.getUser();
    }
        this.registrationForm = this.formBuilder.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
        })
  }

  getUser(){
    this.apiService.request('getUserDetails', 'get', undefined, this.userId).subscribe(result => {
      console.log('Get user data: ', result);
      if(result){
        this.registrationForm?.patchValue(result);
        this.userDetails = result;
      }
    });
  }

  editUser(){
    this.apiService.request('editUserDetails', 'put', this.registrationForm?.value, this.userId).subscribe(result=>{
      console.log(result);
      if(result){
        Swal.fire('Success', 'Your User details has been updated', 'success').then(swalResult =>{
          console.log('Swal Result', swalResult);
          if(swalResult.value){
            this.router.navigate(['/home']);
          }
        })
      }
    }
    )
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { PermissionService } from '../../services/permission.service';

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
  showPassword:boolean = false;
  loginForm?:FormGroup;
  isLogin: boolean = false;
  user: any;


  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private formBuilder:FormBuilder,
    public permission: PermissionService,
    
  ){}

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.user = this.storageService.get('user');
    if (this.user) {
      this.isLogin=true;
    }
  }

  togglePassword():void{
    this.showPassword = !this.showPassword;
  }

  login(){
    console.log(this.loginForm);
    this.apiService.request('login','post', this.loginForm?.value).subscribe(result => {
      console.log('Succesully logged in'); // message that admin has logged
      if(result){
        this.storageService.set('token', result['token']);
        this.storageService.set('user', result['user']);
        this.isLogin = true;
      }
    })
  }

  logout(){
    this.storageService.remove('user');
    this.storageService.remove('token');
    this.isLogin = false;
  }

}

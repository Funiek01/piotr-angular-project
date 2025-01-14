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
  userId: string | null = '';
  userDetails?: User;
  routerSubscription?: Subscription;
  constructor(
    private apiService: ApiService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService
  ){}
  
  ngOnInit():void{
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.userId){
      this.getUserDetails();
    }
    if(!this.routerSubscription){
    this.routerSubscription = this.router.events.subscribe(eventResult => {
      console.log('Event result: ',eventResult);
      if(eventResult instanceof NavigationEnd && eventResult.url.includes('/users/view/')){
        this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        if(this.userId){
          this.getUserDetails();
        }
      }
    })
    }
  }
  getUserDetails(){
    this.apiService.request('getUserDetails','get', undefined, this.userId).subscribe(result => {
      console.log('Get user details: ',result);
      this.userDetails = result;
    })
  }

  ngOnDestroy():void{
    this.routerSubscription?.unsubscribe();
  }

}

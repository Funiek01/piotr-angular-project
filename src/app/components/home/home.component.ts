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
  user?: User;


  constructor(private storageService: StorageService, public permission:PermissionService){}

  ngOnInit(): void{
    this.user = this.storageService.get('user')

  }

  isLoggedIn(): boolean {
    return this.permission.isAuthUser();
  }

}

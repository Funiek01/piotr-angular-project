import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { PermissionService } from '../../services/permission.service';
import { StorageService } from '../../services/storage.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { DTO } from '../../models/dto';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userList: User[]=[];

  constructor(
    public permissionService: PermissionService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.apiService.request<DTO<User[]>>('userList','get').subscribe((users:DTO<User[]>)=>{
      this.userList= users['data'];
    }
    )
  }

  getInitials(name: string): string {
    return name[0].toUpperCase();
  }

  getRandomColor(): string {
    const colors = ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}

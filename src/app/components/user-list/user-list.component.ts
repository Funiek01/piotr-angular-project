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
  userList: User[]=[];

  filterUserList: User[] = [];
  searchText : string = '';


  readonly colors = ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];

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
      this.filterUserList = this.userList;
    }
    )
  }

  getInitials(name: string): string {
    return name[0].toUpperCase();
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }


  searchUser(){
    console.log("searchText:",this.searchText);
    const text = this.searchText.toLocaleLowerCase();
    this.filterUserList = this.userList;
    if(this.searchText){
      this.filterUserList = this.userList.filter( user => {
        return (
          user.first_name.toLocaleLowerCase().includes(text) ||
          user.username.toLocaleLowerCase().includes(text)
        )
      })
      console.log("filter user list:",this.filterUserList);
      return;
    }
  }

  clearSearch(){
    this.searchText='';
    this.searchUser();
  }

}

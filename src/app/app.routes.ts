import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AboutComponent } from './components/about/about.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegistrationComponent},
    { path: 'user-list', component: UserListComponent},
    { path: 'details/:id', component:UserDetailsComponent },
    { path: 'home', component: HomeComponent},
    { path: 'edit/:id', component:EditUserComponent },
    { path: 'about', component:AboutComponent },
    { path: '**', redirectTo: '/home' },
];

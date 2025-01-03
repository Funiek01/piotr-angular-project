import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegistrationComponent},
    { path: 'home', component: HomeComponent},
    { path: '**', redirectTo: '/home' },
];

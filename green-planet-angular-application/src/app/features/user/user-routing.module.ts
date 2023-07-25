import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthActivate } from 'src/app/core/guards/auth.activate';
import { LogoutComponent } from './pages/logout/logout.component';
import { NoAuthActivate } from 'src/app/core/guards/noAuth.activate';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthActivate] },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthActivate] },
  { path: 'my-profile', component: ProfileComponent, canActivate: [AuthActivate] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }

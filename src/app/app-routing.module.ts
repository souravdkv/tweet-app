import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { TweetsComponent } from './dashboard/tweets/tweets.component';
import { UserTweetsComponent } from './dashboard/user-tweets/user-tweets.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'tweets', component:TweetsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'my-tweets', component:UserTweetsComponent },
  { path: 'all-users', component:AllUsersComponent },
  { path: 'forgot-password', component:ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

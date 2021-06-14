import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UserTweetsComponent } from './user-tweets/user-tweets.component';


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

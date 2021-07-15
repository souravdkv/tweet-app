import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { CommentsComponent } from './dashboard/comments/comments.component';
import { TweetsComponent } from './dashboard/tweets/tweets.component';
import { UserTweetsComponent } from './dashboard/user-tweets/user-tweets.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tweets', component: TweetsComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuardGuard] },
  { path: 'my-tweets', component: UserTweetsComponent, canActivate: [AuthGuardGuard] },
  { path: 'comments/:id', component: CommentsComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'all-users', component: AllUsersComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

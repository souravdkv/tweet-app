import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TweetsComponent } from './dashboard/tweets/tweets.component';
import { ToastComponent } from './dashboard/toast/toast.component';
import { PostTweetDialogComponent } from './dashboard/post-tweet-dialog/post-tweet-dialog.component';
import { UserTweetsComponent } from './dashboard/user-tweets/user-tweets.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { ExternalTweetsComponent } from './dashboard/external-tweets/external-tweets.component';
import { CommentsComponent } from './dashboard/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TweetsComponent,
    ToastComponent,
    PostTweetDialogComponent,
    UserTweetsComponent,
    AllUsersComponent,
    ExternalTweetsComponent,
    ForgotPasswordComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [ToastComponent],
  bootstrap: [AppComponent],
  entryComponents:[PostTweetDialogComponent, ExternalTweetsComponent]
})
export class AppModule { }

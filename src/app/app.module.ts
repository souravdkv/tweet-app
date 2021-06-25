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
import { TweetsComponent } from './tweets/tweets.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PostTweetDialogComponent } from './post-tweet-dialog/post-tweet-dialog.component';
import { UserTweetsComponent } from './user-tweets/user-tweets.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ExternalTweetsComponent } from './external-tweets/external-tweets.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

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
    DashboardLayoutComponent
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

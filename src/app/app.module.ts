import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule
} from '@angular/material';
import { TweetsComponent } from './tweets/tweets.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TweetsComponent,
    ToastComponent
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
    MatSnackBarModule
  ],
  providers: [ToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

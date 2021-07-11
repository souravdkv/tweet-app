import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/dashboard/toast/toast.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public loginService: LoginServiceService,
    public router: Router,
    public toastComponent: ToastComponent) { }

  form: FormGroup = new FormGroup({
    username: new FormControl('')
  });

  ngOnInit() {
  }



  forgotPassword() {
    let body = {
      "password": "",
      "phoneNumber": ""
    }
    this.loginService.forgotPassword(this.form.get('username').value, body).subscribe(forgotItem => {
      console.log(forgotItem)
      this.toastComponent.openSnackBar(forgotItem.body.message);
      this.router.navigateByUrl('/login')
    }, error => {
      this.toastComponent.openSnackBar(error.error.errors[0]);
    })
  }

}

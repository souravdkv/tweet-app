import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public loginService:LoginServiceService,
    public toastComponent:ToastComponent) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    phoneNumber : new FormControl('')
  });

  ngOnInit() {
  }



  forgotPassword(){
    let body = {
      "password": this.form.get('password').value,
      "phoneNumber": this.form.get('phoneNumber').value
    }
    this.loginService.forgotPassword(this.form.get('username').value,body).subscribe(forgotItem =>{
      console.log(forgotItem)
      this.toastComponent.openSnackBar(forgotItem.body.message);
    }, error =>{
      this.toastComponent.openSnackBar(error.error.errors[0]);
    })
  }

}

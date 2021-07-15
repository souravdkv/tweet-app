import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/dashboard/toast/toast.component';
import { AuthService } from '../../services/authService/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginService:LoginServiceService,
    public router: Router,
    public toastComponent:ToastComponent,
    private authService: AuthService) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  login(){
    this.loginService.loginUser(this.form.get('username').value,this.form.get('password').value).subscribe(item=>{
      this.toastComponent.openSnackBar(item.name +" logged in successfully")
      localStorage.setItem("username",this.form.get('username').value);
      this.authService.setUserLoginState(true);
      this.router.navigateByUrl('/tweets')
    },error =>{
      this.toastComponent.openSnackBar(error.error.errors[0])
    })
  }

}

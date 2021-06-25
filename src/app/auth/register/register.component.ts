import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterServiceService } from '../../services/register-service.service';
import { ToastComponent } from 'src/app/dashboard/toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public registerService: RegisterServiceService,
    public router: Router,
    public toastComponent: ToastComponent) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('', Validators.pattern('^[0-9]*$'))
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  signUpUser() {
    this.registerService.addUser(this.form.value).subscribe(item => {
      this.toastComponent.openSnackBar(item.body.message)
      this.router.navigateByUrl('/login')
    }, error => {
      this.toastComponent.openSnackBar(error.error.errors[0])
    })
  }

}

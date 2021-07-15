import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from '../dashboard/toast/toast.component';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public toastService: ToastComponent,
    public router: Router,
    private authService: AuthService
    ) { }

  islogInUser = true;

  user = localStorage.getItem("username")

  ngOnInit() {
    this.authService.getUserLoginState().subscribe((data) => {
      this.islogInUser = data;
    })
  }

  logOut() {
    let user = localStorage.getItem("username");
    if (user) {
      localStorage.removeItem("username");
      this.authService.setUserLoginState(false);
      this.toastService.openSnackBar("Logged Out successfully");
      this.router.navigateByUrl('/login')
    } else {
      this.toastService.openSnackBar("No user logged in");
    }
  }

}

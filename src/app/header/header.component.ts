import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public toastService:ToastComponent) { }

  user = localStorage.getItem("username")

  ngOnInit() {

  }

  logOut(){
    let user = localStorage.getItem("username");
    if(user){
      localStorage.removeItem("username");
      this.toastService.openSnackBar("Logged Out successfully");
    } else {
      this.toastService.openSnackBar("No user logged in");
    }
  }

}

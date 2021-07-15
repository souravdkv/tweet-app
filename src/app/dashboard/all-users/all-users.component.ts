import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExternalTweetsComponent } from '../external-tweets/external-tweets.component';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { TweetServiceService } from 'src/app/services/tweet-service.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  constructor(public userService: UsersServiceService,
    public dialog: MatDialog,
    public toastService: ToastComponent,
    public router: Router,
    public tweetService: TweetServiceService,
    public formBuilder: FormBuilder,
    public toastComponent: ToastComponent) {
    this.searchUserForm = this.formBuilder.group({
      searchUserInput: ''
    });
  }

  users;

  public searchUserForm: FormGroup;

  ngOnInit() {
    let username = localStorage.getItem("username");
    if (username) {
      this.userService.getAllUsers().subscribe(users => {
        this.users = users;

        if (this.users.length == 0) {
          this.toastComponent.openSnackBar("No Users Found !!!")
        }
      });

    } else {
      this.toastService.openSnackBar("please login first to view users")
      this.router.navigateByUrl('/login')
    }
  }

  viewTweets(user) {
    const dialogRef = this.dialog.open(ExternalTweetsComponent, {
      width: '500px',
      data: [user],
      height: '500px'
    });
  }

  searchUser() {

    this.userService.searchUsers(this.searchUserForm.get('searchUserInput').value).subscribe(users => {
      this.users = users;
      if (this.users.length == 0) {
        this.toastComponent.openSnackBar("No Users Found !!!")
      }
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExternalTweetsComponent } from '../external-tweets/external-tweets.component';
import { TweetServiceService } from '../services/tweet-service.service';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    this.tweetService.getUserTweet(user).subscribe(tweetItem => {
      const dialogRef = this.dialog.open(ExternalTweetsComponent, {
        width: '500px',
        data: [tweetItem, user],
        height: '500px'
      });
    })

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

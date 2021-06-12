import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExternalTweetsComponent } from '../external-tweets/external-tweets.component';
import { TweetServiceService } from '../services/tweet-service.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  constructor(public userService:UsersServiceService,
    public dialog: MatDialog,
    public tweetService:TweetServiceService) { }

  users;

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users =>{
      this.users = users;
    })
  }

  viewTweets(user){
    this.tweetService.getUserTweet(user).subscribe(tweetItem =>{
      const dialogRef = this.dialog.open(ExternalTweetsComponent, {
        width: 'auto',
        data:tweetItem
      });
    })
    
  }

}

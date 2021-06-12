import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from '../services/tweet-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostTweetDialogComponent } from '../post-tweet-dialog/post-tweet-dialog.component';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  
  tweets = [];
  constructor(public tweetService:TweetServiceService,
    public dialog: MatDialog,
    public toastService:ToastComponent,
    public router:Router) { }

  ngOnInit() {

    this.tweetService.getAllTweets().subscribe(tweetItem =>{
      this.tweets = tweetItem;
    })

  }

  postTweet(){
    let username = localStorage.getItem("username");
    if(username){
      const dialogRef = this.dialog.open(PostTweetDialogComponent, {
        width: '250px',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.tweetService.getAllTweets().subscribe(tweetItem =>{
          this.tweets = tweetItem;
        })
      });
    }

    else {
      this.toastService.openSnackBar("please login first to post tweet")
      this.router.navigateByUrl('/login')
    }
    
  }

}

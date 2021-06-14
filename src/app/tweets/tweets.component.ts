import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from '../services/tweet-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(public tweetService: TweetServiceService,
    public dialog: MatDialog,
    public toastService: ToastComponent,
    public toastComponent: ToastComponent,
    public router: Router) { }

  ngOnInit() {
    let username = localStorage.getItem("username");
    if (username) {
      this.tweetService.getAllTweets().subscribe(tweetItem => {
        this.tweets = tweetItem;
      })
    }
    else {
      this.toastService.openSnackBar("please login first to view tweets")
      this.router.navigateByUrl('/login')
    }

  }

  postTweet() {
    const dialogRef = this.dialog.open(PostTweetDialogComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.tweetService.getAllTweets().subscribe(tweetItem => {
        this.tweets = tweetItem;
      })
    });
  }

  likeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.likeTweet(loggedInUser, id).subscribe(likeItem => {
      this.toastComponent.openSnackBar("Liked")
      this.tweetService.getAllTweets().subscribe(tweetItem => {
        this.tweets = tweetItem;
      })
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  dislikeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.dislikeTweet(loggedInUser, id).subscribe(dislikeItem => {
      this.toastComponent.openSnackBar("Disliked")
      this.tweetService.getAllTweets().subscribe(tweetItem => {
        this.tweets = tweetItem;
      })
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }
}
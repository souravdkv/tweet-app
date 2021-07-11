import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostTweetDialogComponent } from '../post-tweet-dialog/post-tweet-dialog.component';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';
import * as moment from 'moment';

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

    username: string;

  ngOnInit() {
    this.username = localStorage.getItem("username");
    if (this.username) {
      this.getAllTweets();
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
      this.getAllTweets();
    });
  }

  likeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.likeTweet(loggedInUser, id).subscribe(likeItem => {
      this.toastComponent.openSnackBar("Liked")
      this.getAllTweets();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  dislikeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.dislikeTweet(loggedInUser, id).subscribe(dislikeItem => {
      this.toastComponent.openSnackBar("Disliked");
      this.getAllTweets();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  private getAllTweets() {
    this.tweetService.getAllTweets().subscribe(tweetItem => {
      if (tweetItem.length == 0) {
        this.toastComponent.openSnackBar("No Tweets Found !!!");
        return;
      }
      this.tweets = tweetItem;
      this.updateTimeFromNow();
    })
  }


  private updateTimeFromNow() {
    this.tweets.forEach(tweetItem =>{
      tweetItem.fromNow = moment(tweetItem.postTime * 1000).fromNow()
    });
    this.isLikedByUser();
  }

  private isLikedByUser() {
    this.tweets.forEach((tweetItem, i)=> {
      tweetItem = {
        ...tweetItem,
        likedByUser:  tweetItem.likes.filter(likedUsers => likedUsers.username === this.username ).length > 0
      }
      this.tweets[i] = tweetItem;
    });
    console.log(this.tweets);
    
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { TweetServiceService } from 'src/app/services/tweet-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostTweetDialogComponent } from '../post-tweet-dialog/post-tweet-dialog.component';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  tweets = [];
  username: string;
  @Input() showOnlyMyTweet = false;
  commentForm: FormGroup;
  @Input() specifiedUser = '';
  constructor(public tweetService: TweetServiceService,
    public dialog: MatDialog,
    public toastService: ToastComponent,
    public toastComponent: ToastComponent,
    public router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    if (this.username) {
      this.loadTweets();
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
      this.loadTweets();
    });
  }

  likeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.likeTweet(loggedInUser, id).subscribe(likeItem => {
      this.toastComponent.openSnackBar("Liked")
      this.loadTweets();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  dislikeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.dislikeTweet(loggedInUser, id).subscribe(dislikeItem => {
      this.toastComponent.openSnackBar("Disliked");
      this.loadTweets();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  deleteTweet(id) {
    this.tweetService.deleteUserTweet(this.username, id).subscribe(deleteDitem => {
      this.toastComponent.openSnackBar("Deleted Successfully")
      this.tweetService.getUserTweet(this.username).subscribe(tweetItem => {
        this.tweets = tweetItem;
        this.updateTimeFromNow();
      })
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  goToComments(id: string) {
    this.router.navigateByUrl('comments/' + id);
  }

  private loadTweets() {
    this.showOnlyMyTweet ? this.loadUserTweets() : this.getAllTweets();
  }

  private loadUserTweets() {
    const username = this.specifiedUser != '' ? this.specifiedUser : this.username;
    this.tweetService.getUserTweet(username).subscribe(tweetItem => {
      this.tweets = tweetItem;
      this.updateTimeFromNow();
      if (this.tweets.length == 0) {
        this.toastComponent.openSnackBar("No Tweets Found !!!")
      }
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
    this.showDeleteTweet();
  }

  private showDeleteTweet() {
    this.tweets.forEach(tweetItem =>{
      tweetItem.showDelete = tweetItem.username === this.username
    });
  }
}
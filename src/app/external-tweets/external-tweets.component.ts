import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TweetServiceService } from '../services/tweet-service.service';
import { ToastComponent } from '../toast/toast.component';
import * as moment from 'moment';

@Component({
  selector: 'app-external-tweets',
  templateUrl: './external-tweets.component.html',
  styleUrls: ['./external-tweets.component.scss']
})
export class ExternalTweetsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public tweetService: TweetServiceService,
    public toastService: ToastComponent,
    public toastComponent: ToastComponent) { }

  tweets;

  ngOnInit() {
    this.tweets = this.data[0]
    this.updateTimeFromNow();

    if (this.tweets.length == 0) {
      this.toastComponent.openSnackBar("No Tweets Found !!!")
    }
  }

  likeTweet(list) {
    console.log("list ===> ",list)
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.likeTweet(loggedInUser, list.id).subscribe(likeItem => {
      this.toastComponent.openSnackBar("Liked")
      this.tweetService.getUserTweet(this.data[1]).subscribe(tweetItem => {
        this.tweets = tweetItem;
        this.updateTimeFromNow();
      })
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  dislikeTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.dislikeTweet(loggedInUser, id).subscribe(dislikeItem => {
      this.toastComponent.openSnackBar("Disliked")
      this.tweetService.getUserTweet(this.data[1]).subscribe(tweetItem => {
        this.tweets = tweetItem;
        this.updateTimeFromNow();
      })
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  updateTimeFromNow(){
    this.tweets.forEach(tweetItem =>{
      tweetItem.fromNow = moment(tweetItem.postTime * 1000).fromNow()
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from '../services/tweet-service.service';
import { ToastComponent } from '../toast/toast.component';
import { TweetsComponent } from '../tweets/tweets.component';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.scss']
})
export class UserTweetsComponent implements OnInit {

  constructor(public tweetService: TweetServiceService,
    public toastService: ToastComponent,
    public router: Router,
    public toastComponent: ToastComponent) { }

  tweets;

  ngOnInit() {
    let loggedInUser = localStorage.getItem("username")
    if (loggedInUser) {
      this.tweetService.getUserTweet(loggedInUser).subscribe(tweetItem => {
        this.tweets = tweetItem;
        this.updateTimeFromNow();

        if (this.tweets.length == 0) {
          this.toastComponent.openSnackBar("No Tweets Found !!!")
        }
      })
    }
    else {
      this.toastService.openSnackBar("please login first to view tweets")
      this.router.navigateByUrl('/login')
    }
  }

  deleteTweet(id) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.deleteUserTweet(loggedInUser, id).subscribe(deleteDitem => {
      this.toastComponent.openSnackBar("Deleted Successfully")
      this.tweetService.getUserTweet(loggedInUser).subscribe(tweetItem => {
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

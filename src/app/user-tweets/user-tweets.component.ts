import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from '../services/tweet-service.service';
import { ToastComponent } from '../toast/toast.component';
import { TweetsComponent } from '../tweets/tweets.component';
import { Router } from '@angular/router';

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
      })
    }
    else {
      this.toastService.openSnackBar("please login first to view tweets")
      this.router.navigateByUrl('/login')
    }
  }

  deleteTweet(list) {
    let loggedInUser = localStorage.getItem("username")
    this.tweetService.deleteUserTweet(loggedInUser, list.id).subscribe(deleteDitem => {
      this.toastComponent.openSnackBar("Deleted Successfully")
      this.tweetService.getUserTweet(loggedInUser).subscribe(tweetItem => {
        this.tweets = tweetItem;
      })
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

}

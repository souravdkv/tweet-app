import { Component, OnInit } from '@angular/core';
import { TweetServiceService } from '../services/tweet-service.service';
import { TweetsComponent } from '../tweets/tweets.component';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.scss']
})
export class UserTweetsComponent implements OnInit {

  constructor(public tweetService:TweetServiceService) { }

  tweets;

  ngOnInit() {
    let loggedInUser =  localStorage.getItem("username")
    this.tweetService.getUserTweet(loggedInUser).subscribe(tweetItem =>{
      this.tweets = tweetItem;
    })


  }

}

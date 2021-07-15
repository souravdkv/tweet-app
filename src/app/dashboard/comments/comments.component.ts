import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TweetServiceService } from '../../services/tweet-service.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  username: string;
  tweets;
  tweetId: string;
  commentForm: FormGroup;
  constructor(
    private tweetService: TweetServiceService,
    private toastService: ToastComponent,
    private toastComponent: ToastComponent,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.route.params.subscribe((data) => {
      this.tweetId = data.id;
    })
    if (this.username) {
      this.getTweetDetails();
    }
    else {
      this.toastService.openSnackBar("please login first to view tweets")
      this.router.navigateByUrl('/login')
    }
    this.cretaeForm();
  }

  likeTweet(id) {
    this.tweetService.likeTweet(this.username, id).subscribe(likeItem => {
      this.toastComponent.openSnackBar("Liked")
      this.getTweetDetails();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  dislikeTweet(id) {
    this.tweetService.dislikeTweet(this.username, id).subscribe(dislikeItem => {
      this.toastComponent.openSnackBar("Disliked");
      this.getTweetDetails();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  deleteTweet(id) {
    this.tweetService.deleteUserTweet(this.username, id).subscribe(deleteDitem => {
      this.toastComponent.openSnackBar("Deleted Successfully");
      this.router.navigateByUrl('tweets');
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  deleteReply(id: string) {
    this.tweetService.deleteUserTweetReply(this.username, this.tweetId, id).subscribe(deleteDitem => {
      this.toastComponent.openSnackBar("Deleted Successfully");
      this.getTweetDetails();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  replyComment() {
    this.tweetService.replyComment(this.username, this.tweetId, this.commentForm.value).subscribe(likeItem => {
      this.toastComponent.openSnackBar("Liked");
      this.commentForm.reset();
      this.getTweetDetails();
    }, error => {
      this.toastComponent.openSnackBar("Something went wrong !!!!")
    })
  }

  private cretaeForm(){
    this.commentForm = this.fb.group({
      reply: ['', [Validators.required]]
    });
  }

  private getTweetDetails() {
    this.tweetService.getTweetDetails(this.tweetId).subscribe(tweetItem => {
      this.tweets = tweetItem;
      this.updateTimeFromNow();
    })
  }


  private updateTimeFromNow() {
    this.tweets.fromNow = moment(this.tweets.postTime * 1000).fromNow()
    this.isLikedByUser();
  }

  private isLikedByUser() {
    this.tweets = {
      ...this.tweets,
      likedByUser: this.tweets.likes.filter(likedUsers => likedUsers.username === this.username).length > 0
    }
    this.showDeleteTweet();
  }

  private showDeleteTweet() {
    this.tweets.showDelete = this.tweets.username === this.username;
    this.showCommentDelete();
  }

  private showCommentDelete() {
    this.tweets.replies.forEach((reply, index) => {
      reply = {
        ...reply,
        showDelete: reply.username === this.username
      }
      reply.fromNow = moment(reply.replyTime * 1000).fromNow()
      this.tweets.replies[index] = reply;
    });
  }

}

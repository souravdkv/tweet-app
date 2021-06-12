import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TweetServiceService } from '../services/tweet-service.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-post-tweet-dialog',
  templateUrl: './post-tweet-dialog.component.html',
  styleUrls: ['./post-tweet-dialog.component.scss']
})
export class PostTweetDialogComponent implements OnInit {

  constructor(public tweetService:TweetServiceService,
    public dialogRef: MatDialogRef<PostTweetDialogComponent>,
    public toastComponent:ToastComponent) { }

  form: FormGroup = new FormGroup({
    tweet: new FormControl(''),
  });

  ngOnInit() {
  }

  postTweet(){
    let user = localStorage.getItem("username")
    this.tweetService.postTweet(this.form.get('tweet').value,user).subscribe(tweetResponse =>{
      this.dialogRef.close();
    },error =>{
      this.toastComponent.openSnackBar("something went wrong !!! , try again")
    })
  }

}

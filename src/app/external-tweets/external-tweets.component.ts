import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-external-tweets',
  templateUrl: './external-tweets.component.html',
  styleUrls: ['./external-tweets.component.scss']
})
export class ExternalTweetsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  tweets;

  ngOnInit() {
    this.tweets = this.data
  }

}

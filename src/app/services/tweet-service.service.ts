import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {

  constructor(private http: HttpClient) { }


  getAllTweets():Observable<any>{
    return this.http.get("https://tweetapp-api.herokuapp.com/api/v1.0/tweets/all");
  }

  postTweet(tweet,username):Observable<any>{
    let tweetBody = {
      "tweet": tweet
    }
    return this.http.post("https://tweetapp-api.herokuapp.com/api/v1.0/tweets/"+username+"/add",tweetBody,{observe:'response' , withCredentials:true});
  }
}

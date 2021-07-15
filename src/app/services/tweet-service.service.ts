import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIURLS } from '../constants/APIUrls';

@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {

  constructor(private http: HttpClient) { }


  getAllTweets():Observable<any>{
    return this.http.get(`${APIURLS.baseUrl}/all`);
  }

  postTweet(tweet,username):Observable<any>{
    let tweetBody = {
      "tweet": tweet
    }
    return this.http.post(`${APIURLS.baseUrl}/${username}/add`,tweetBody,{observe:'response' , withCredentials:true});
  }


  getUserTweet(username):Observable<any>{
    return this.http.get(`${APIURLS.baseUrl}/${username}`);
  }

  deleteUserTweet(username,tweetID):Observable<any>{
    return this.http.delete(`${APIURLS.baseUrl}/${username}/delete/${tweetID}`);
  }

  likeTweet(username,tweetID):Observable<any>{
    return this.http.put<any>(`${APIURLS.baseUrl}/${username}/like/${tweetID}`,{observe:'response' , withCredentials:true});
  }

  dislikeTweet(username,tweetID):Observable<any>{
    return this.http.put<any>(`${APIURLS.baseUrl}/${username}/dislike/${tweetID}`,{observe:'response' , withCredentials:true});
  }

  getTweetDetails(id):Observable<any>{
    return this.http.get(`${APIURLS.baseUrl}/tweet/${id}`);
  }
  deleteUserTweetReply(username,tweetId, replyId):Observable<any>{
    return this.http.delete(`${APIURLS.baseUrl}/${username}/reply/${tweetId}/${replyId}`);
  }

  replyComment(username: string, tweetId: string, comment: string): Observable<any> {
    return this.http.post<any>(`${APIURLS.baseUrl}/${username}/reply/${tweetId}`, comment);
  }
}

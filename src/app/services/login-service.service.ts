import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  loginUser(username:any,password:any):Observable<any>{
    return this.http.get("https://tweetapp-api.herokuapp.com/api/v1.0/tweets/login?password="+password+"&username="+username)
  }


  forgotPassword(username,body):Observable<any>{
    return this.http.post("https://tweetapp-api.herokuapp.com/api/v1.0/tweets/"+username+"/forget",body,{observe:'response',withCredentials:true})
  }
}

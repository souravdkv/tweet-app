import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  addUser(body):Observable<any>{
    return this.http.post("https://tweetapp-api.herokuapp.com/api/v1.0/tweets/register", body,{observe: 'response' , withCredentials:true});
  }
}

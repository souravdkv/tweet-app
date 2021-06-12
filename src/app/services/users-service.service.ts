import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get("https://tweetapp-api.herokuapp.com/api/v1.0/tweets/users/all");
  }
}

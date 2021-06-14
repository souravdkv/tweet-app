import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIURLS } from '../constants/APIUrls';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  addUser(body):Observable<any>{
    return this.http.post(`${APIURLS.baseUrl}/register`, body,{observe: 'response' , withCredentials:true});
  }
}

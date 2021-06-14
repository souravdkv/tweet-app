import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIURLS } from '../constants/APIUrls';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  loginUser(username:any,password:any):Observable<any>{
    return this.http.get(`${APIURLS.baseUrl}/login?password=${password}&username=${username}`)
  }


  forgotPassword(username,body):Observable<any>{
    return this.http.post(`${APIURLS.baseUrl}/${username}/forget`,body,{observe:'response',withCredentials:true})
  }
}

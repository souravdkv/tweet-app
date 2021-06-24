import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIURLS } from '../constants/APIUrls';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${APIURLS.baseUrl}/users/all`);
  }

  searchUsers(searchInput): Observable<any> {
    return this.http.get(`${APIURLS.baseUrl}/user/search/${searchInput}`);
  }
}

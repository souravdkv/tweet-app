import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private islogInUser = new BehaviorSubject<boolean>(false);

  constructor() { }

  setUserLoginState(state: boolean) {
    this.islogInUser.next(state);
  }

  getUserLoginState(): Observable<any> {
    return this.islogInUser;
  }

  public isAuthenticated(): boolean {
    const username = localStorage.getItem('username');
    return username ? true : false;
  }
}

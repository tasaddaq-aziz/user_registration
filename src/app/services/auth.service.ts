import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserViewModel } from '../models/viewmodels/UserViewModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7104/api/user/"
  constructor(private http: HttpClient, private router: Router) { }

  signup(userObj: UserViewModel) {
    const url = this.baseUrl + 'register';
    return this.http.post<any>(url, userObj);

  }
  login(loginObj: UserViewModel) {
    const url = this.baseUrl + 'authenticate';
    return this.http.post<any>(url, loginObj);
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken(tokenValue: string) {
    localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

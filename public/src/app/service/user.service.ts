import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import './userInterface'; // Interface data

const userApi = 'http://localhost:3000/user-api/register';
const userAuthenticate = 'http://localhost:3000/user-api/authenticate';

@Injectable()
export class UserService {
  user;

  constructor(private http: HttpClient) { }
  // Register user api call
  registerUser(user) {
    console.log('Register user details sent to express');
    // console.log(user); Un-comment to check user data in console
    const body = JSON.stringify(user);
    return this.http.post(userApi, user,
      // Options
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      });
  }
  // Login user
  authenticateUser(user) {
    console.log('Authenticate user details sent to EN');
    const body = JSON.stringify(user);
    return this.http.post(userAuthenticate, user,
      // Options
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      });
  }
}

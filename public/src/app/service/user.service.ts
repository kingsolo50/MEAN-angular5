import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import './userInterface'; // Interface data

const userApi = 'http://localhost:3000/user-api/register';

@Injectable()
export class UserService {
  user;

  constructor(private http: HttpClient) { }
  // Register user api call
  registerUser(user) {
    console.log('Register user details sent to express');
    console.log(user);
    const body = JSON.stringify(user);
    return this.http.post(userApi, user,
      // Options
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { ValidateService } from '../service/validate.service';
import { UserService } from '../service/user.service';
import '../service/userInterface'; // Interface data
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    // Login Authenticate
    this.userService.authenticateUser(user).subscribe(
      data => {
        // console.log(data); // Used to check data
        // console.log(data.success); // Used to check data
        // console.log('Hi ' + data.user.firstname); // Used to check data
        if (data.success = true) {
          // this.userService.storeUserData(data.token, data.user);
          this.flashMessage.show('Welcome ' + data.user.firstname, { cssClass: 'alert-primary', timeout: 5000 });
          this.router.navigate(['/dashboard']); // Send to login in page
        } else {
          this.flashMessage.show('Error please try again', { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['/login']); // Send back to register page
        }
      }
    );

  }
}

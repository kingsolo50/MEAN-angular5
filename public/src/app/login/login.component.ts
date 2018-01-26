import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { ValidateService } from '../service/validate.service';
import { UserService } from '../service/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String;
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
      email: this.email,
      password: this.password
    };

    // Login Authenticate
    this.userService.authenticateUser(user).subscribe(
      data => {
        // console.log('Hi user email' + data.user.firstname);
        console.log(data);
      }
    );
  }

}

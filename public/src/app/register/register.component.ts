import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { ValidateService } from '../service/validate.service';
import { UserService } from '../service/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  firstname: String;
  lastname: String;
  password: String;
  email: String;

  constructor(
                private validateService: ValidateService,
                private flashMessage: FlashMessagesService,
                private userService: UserService,
                private router: Router
              ) {}

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log('Button to submit clicked');
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    };
    // Validating user inputs
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      // console.log('Please use a valid email');
      return false;
    }
    // After validation register user using const user
    this.userService.registerUser(user).subscribe(
      data => {
        if (data) {
          this.flashMessage.show('User succefully Registered and can log in', { cssClass: 'alert-primary', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('Error!, please check fields and try again', { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/register']);
        }
      }
    );
    console.log('Success from AN');
  }

}

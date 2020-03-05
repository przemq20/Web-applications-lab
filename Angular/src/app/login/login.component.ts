import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string;
  password: string;

  constructor(public authenticationService: AuthService) { }

  // signUp() {
  //   this.authenticationService.SignUp(this.email, this.password);
  //   this.email = '';
  //   this.password = '';
  // }

  signIn() {
    console.log(this.authenticationService.cCurrentUser());
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
    console.log(this.authenticationService.cCurrentUser());

  }

  signOut() {
    this.authenticationService.SignOut();
    this.authenticationService.SetLoggedIn(false);

  }
  googleLogin() {
    this.authenticationService.googleSignin();

  }
  facebookLogin() {
    this.authenticationService.doFacebookLogin();

  }
  googleSignin() {
    this.authenticationService.googleSignin();
  }

  // loginwithemail(email, password) {
  //   this.authenticationService.loginwithemail(email, password);
  // }
}

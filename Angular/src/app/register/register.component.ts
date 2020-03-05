import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  isAdmin = false;

  constructor(public authenticationService: AuthService, public angularFireAuth: AngularFireAuth, public router: Router) { }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password, this.displayName, this.photoURL, this.isAdmin);
    this.email = '';
    this.password = '';
    this.displayName = '';
    this.photoURL = null;
    this.isAdmin = false;
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
    this.authenticationService.SetLoggedIn(false);
    this.router.navigate(['/']);
  }

}

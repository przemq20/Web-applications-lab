import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { AuthInfo } from './auth-info';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { validateEventsArray } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '../../datamodel/user.model'; // optional
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

// import { AngularFireAuth } from 'angularfire2/auth';

interface MyData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public angularFireAuth: AngularFireAuth, public router: Router, private afs: AngularFirestore) {
    this.userData = angularFireAuth.authState;

    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

  }


  get IsLoggedIn() {
    return this.loggedInStatus;
  }

  get IsAdmin() {
    return this.isAdmin;
  }

  static UNKNOWN_USER = new AuthInfo(null);
  user$: Observable<User>;

  private loggedInStatus = false;
  userData: Observable<firebase.User>;
  private isAdmin = false;
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  userState: any;
  user: any;
  user1: User;

  SetLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
  SetAdmin(value: boolean) {
    this.isAdmin = value;
  }
  cCurrentUser() {
    console.log(this.angularFireAuth.authState.subscribe(val => val.uid));
    return this.angularFireAuth.authState.subscribe(val => val.uid);
  }

  /* Sign up */
  SignUp(email: string, password: string, displayName1: string, photoURL1: string, isAdmin: boolean) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', this.user = res),
          alert('Pomyślnie zarejestrowano'), this.router.navigate(['/']),
          this.router.navigate(['/']),
          this.SetLoggedIn(true);
        const user = {
          uid: this.user.user.uid,
          email: this.user.user.email,
          displayName: displayName1,
          photoURL: photoURL1,
          isAdmin: false,
        };
        this.updateUserData(user);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message),
          alert(error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    // const session = this.angularFireAuth.auth.Persistence.SESSION;
    if (email === 'admin@admin.com' && password === 'admin1') {
      console.log('adminmode');
      this.isAdmin = true;
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('Successfully signed in!'), this.SetLoggedIn(true), this.SetAdmin(true), this.router.navigate(['/admin']);

        })
        .catch(err => {
          console.log('Something is wrong:', err.message);
        });
    } else {
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('Successfully signed in!'), this.SetLoggedIn(true), this.SetAdmin(false),
            alert('Pomyślnie zalogowano!'),
            this.router.navigate(['/']), console.log(this.cCurrentUser());
        })
        .catch(err => {
          alert(err.message),
            console.log('Something is wrong:', err.message);
        });
    }
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
    console.log('Successfully signed out!');
    alert('Pomyślnie wylogowano');
    //  this.router.navigate(["/"]);
    this.SetLoggedIn(false);
    this.SetAdmin(false);
    //  this.userData = null;
  }


  navigateToHome() {
    this.router.navigate(['/']);
  }
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.auth.signInWithPopup(provider);
    console.log(credential);
    //return this.updateUserData(credential.user);
  }


  async registerwithemail(email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // ...
    });
  }

  // async loginwithemail(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //   });

  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  //   console.log(credential);
  //   return this.updateUserData(credential);
  //   // ...

  // }

  private updateUserData(user1) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user1.uid}`);
    const id: any = this.angularFireAuth.auth.currentUser.uid;
    const data = {
      uid: id,
      email: user1.email,
      displayName: user1.displayName,
      photoURL: null,
      isAdmin: false
    };

    return userRef.set(data, { merge: true });

  }

}




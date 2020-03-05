import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { tap, take, switchMap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { async } from 'q';
import { AttrAst } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { analytics } from 'firebase';
import { User } from '../../datamodel/user.model';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  classCol: AngularFirestoreCollection<User>;
  classes: any;

  constructor(public authenticationService: AuthService, private router: Router, private afs: AngularFirestore,
    // tslint:disable-next-line: align
    private route: ActivatedRoute, private afa: AngularFireAuth) { }

  user$: Observable<User>;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  user1: any;
  iD: string;
  id: string;
  photoURL: string;
  ngOnInit() {
    this.usersCollection = this.afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  doSomething() {
    // console.log(this.user$);
    // this.user$ = this.afa.authState.pipe(
    //   switchMap(user => {
    //     // Logged in
    //     if (user) {
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       // Logged out
    //       return of(null);
    //     }
    //   })
    // );
    // console.log(this.user$);

    // return this.user$;
    console.log(this.afs.collection('users').snapshotChanges());
    return this.afs.collection('users');
  }

  getUser() {
    const id = this.afa.auth.currentUser.uid;
    return this.afs.collection('users/id').valueChanges();
  }

  signOut() {
    this.authenticationService.SignOut();
    this.authenticationService.navigateToHome();
  }

  update(newUid: string, newIsAdmin: boolean, newEmail: string, newDisplayName: string) {
    console.log(this.photoURL);
    const newUser = { uid: newUid, displayName: newDisplayName, email: newEmail, isAdmin: newIsAdmin, photoURL: this.photoURL };
    this.afs.doc('users/' + newUid).update(newUser);

    this.photoURL = null;
    alert('Zmieniono zdjęcie użytkownika ' + newDisplayName);
  }
}

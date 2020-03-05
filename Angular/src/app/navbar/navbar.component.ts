import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthInfo } from '../services/auth-info';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../datamodel/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  constructor(public authenticationService: AuthService, public angularFireAuth: AngularFireAuth, private router: Router,
    // tslint:disable-next-line: align
    private afs: AngularFirestore) { }


  ngOnInit() {
    this.usersCollection = this.afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }


  signOut() {
    this.authenticationService.SignOut();
    this.authenticationService.SetLoggedIn(false);
    //    this.authenticationService.navigateToHome();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesserviceService } from '../services/classesservice.service';
import { ClassesComponent } from '../classes/classes.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Class } from '../../datamodel/classes.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/datamodel/user.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})

export class ClassComponent implements OnInit {
  classCol: AngularFirestoreCollection<Class>;
  classes: any;
  classDoc: AngularFirestoreDocument<Class>;

  constructor(private route: ActivatedRoute, private classservice: ClassesserviceService,
    // tslint:disable-next-line: align
    private firestore: AngularFirestore, public authenticationService: AuthService, private router: Router) { }
  iD: any;
  class: any;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  classesCollection: AngularFirestoreCollection<Class>;
  class3: Observable<Class[]>;

  ngOnInit() {
    const id = (this.route.snapshot.params.id);
    this.iD = id;
    this.firestore.doc('classes/' + this.iD).valueChanges().subscribe(val => {
      this.class = val;
    });

    this.classesCollection = this.firestore.collection<Class>('classes');
    this.class3 = this.classesCollection.valueChanges();
    this.usersCollection = this.firestore.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  updateVote(vote: number, mark: number, user, classId, Array1) {
    this.class.voteCount++;
    this.class.mark = (this.class.mark * (this.class.voteCount - 1) + vote) / this.class.voteCount;
    this.firestore.doc('classes/' + this.iD).update(this.class);
    this.signVote(user, classId, Array1);
  }

  check(user, classId) {
    if (classId.signed.includes(user)) {
      return true;
    } else {
      return false;
    }
  }

  checkVote(user, classId) {
    if (classId.voted.includes(user)) {
      return true;
    } else {
      return false;
    }
  }

  sign(user, classId, Array1, max) {
    // console.log(user, classId,Array1);
    if (Array1.length < max) {
      Array1.push(user);
      this.firestore.collection('classes').doc(classId).update({ signed: Array1 });
    } else {
      alert('Brak miejsc');
    }
  }
  signVote(user, classId, Array1) {
    Array1.push(user);
    this.firestore.collection('classes').doc(classId).update({ voted: Array1 });
  }

}


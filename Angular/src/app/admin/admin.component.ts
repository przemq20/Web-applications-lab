import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../datamodel/user.model';
import { Class } from '../../datamodel/classes.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  classCol: AngularFirestoreCollection<Class>;
  classes: any;
  classDoc: AngularFirestoreDocument<Class>;
  class: any;
  class1: any;
  name: string;
  sciezka: string;
  ECTS: number;
  color: string;
  form: string;
  icon: string;
  numberofVotes = 0;
  maxstudents: number;
  mark = 0;
  semester: number;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  id: any;
  signed: string[] = [];
  voted: string[] = [];
  constructor(private afs: AngularFirestore, public authenticationService: AuthService) { }

  ngOnInit() {
    this.usersCollection = this.afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();

    console.log(this.authenticationService.IsAdmin);
    //   this.classCol = this.afs.collection('classes');
    this.classCol = this.afs.collection<Class>('classes', ref => ref.orderBy('name'));

    this.classes = this.classCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Class;
          const id = a.payload.doc.id;
          // console.log({ id, data });
          return { id, data };
        });
      }));
  }

  addClass() {
    this.id = this.afs.createId();
    this.afs.collection('classes').doc(this.id).set({
      id: this.id,
      name: this.name, sciezka: this.sciezka, ECTS: this.ECTS,
      form: this.form, icon: this.icon, maxstudents: this.maxstudents,
      mark: this.mark, semester: this.semester, voteCount: this.numberofVotes,
      signed: this.signed, voted: this.voted
    });
  }

  getClass(classId) {
    this.classDoc = this.afs.doc('classes/' + classId);
    this.class = this.classDoc.valueChanges();
    console.log(this.classDoc.valueChanges().subscribe(val => console.log(val)));
    console.log(this.class);
    return this.classDoc.valueChanges().subscribe(val => { this.class = val; });
  }

  deleteClass(classId) {
    this.afs.doc('classes/' + classId).delete();
  }
}

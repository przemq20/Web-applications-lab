import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../datamodel/user.model';
import { Class } from '../datamodel/classes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';

  classCol: AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;
  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.classCol = this.afs.collection('classes');
    this.classes = this.classCol.valueChanges();
  }
}

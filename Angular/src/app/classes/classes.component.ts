import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Class } from '../../datamodel/classes.model';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ClassesserviceService } from '../services/classesservice.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of, Subject, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from 'src/datamodel/user.model';


interface ClassID extends Class {
    ID: string;
}

@Component({
    selector: 'app-classes',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.css']
})


export class ClassesComponent implements OnInit {
    name1: string;
    classCol: AngularFirestoreCollection<Class>;
    classes: any;
    classDoc: AngularFirestoreDocument<Class>;
    class: Observable<Class>;
    items: Array<any>;
    pageOfItems: Array<any>;
    filteredClasses: any;
    classes1: any;
    classesCollection: AngularFirestoreCollection<Class>;
    class3: any;
    filters = {};
    private usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;
    semestr: number;
    ECTSS: number;
    sortt: number;
    sorttype: number;


    constructor(private router: Router, private route: ActivatedRoute, private classesservices: ClassesserviceService,
        // tslint:disable-next-line: align
        private firestore: AngularFirestore, public authenticationService: AuthService) { }

    ngOnInit() {
        this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('name'));
        this.class3 = this.classesCollection.valueChanges();
        this.usersCollection = this.firestore.collection<User>('users');
        this.users = this.usersCollection.valueChanges();
    }

    get(classId) {
        this.classDoc = this.firestore.doc('class/' + classId);
        this.class = this.classDoc.valueChanges();
    }

    Search() {
        if (this.name1 !== '') {
            this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.where('name', '==', 'name1'));
            this.class3 = this.firestore.collection<Class>('classes', ref => ref.where('name', '==', 'name1'));

        } else if (this.name1 === '') {
            this.ngOnInit();
        }

    }

    OnSelect(classId) {
        this.router.navigate(['/classes', this.firestore.doc('classes/' + classId)]);
    }


    applyFilter(filterValue) {
        this.classes1.name.filter((val) => {
            return val.name.toLowerCase().indexOf(filterValue) > -1;
        });
    }

    check(user, classId) {
        if (classId.signed.includes(user)) {
            return true;
        } else {
            return false;
        }
    }

    sign(user, classId, Array1, max) {
        // console.log(user, classId, Array1);
        if (Array1.length < max) {
            Array1.push(user);
            this.firestore.collection('classes').doc(classId).update({ signed: Array1 });
        } else {
            alert('Brak miejsc');
        }
    }

    semestrfilter() {
        const i = Number(this.semestr);
        const j = Number(this.ECTSS);
        console.log(i);
        if (!isNaN(i)) {
            this.class3 = this.firestore.collection<Class>('classes', ref => ref.where('semester', '==', i)).valueChanges();
        }
        if (!isNaN(j)) {
            this.class3 = this.firestore.collection<Class>('classes', ref => ref.where('ECTS', '==', j)).valueChanges();
        }
    }

    clear() {
        this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('name'));
        this.class3 = this.classesCollection.valueChanges();
    }

    sort() {
        var sorttt = Number(this.sortt);
        var sortttype = Number(this.sorttype);
        if (sorttt === 0) {
            if (sortttype === 1) {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('name', 'asc'));
                this.class3 = this.classesCollection.valueChanges();
            } else {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('name', 'desc'));
                this.class3 = this.classesCollection.valueChanges();
            }
        }
        if (sorttt === 1) {
            if (sortttype === 1) {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('ECTS', 'asc'));
                this.class3 = this.classesCollection.valueChanges();
            } else {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('ECTS', 'desc'));
                this.class3 = this.classesCollection.valueChanges();
            }
        }
        if (sorttt === 2) {
            if (sortttype === 1) {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('semester', 'asc'));
                this.class3 = this.classesCollection.valueChanges();
            } else {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('semseter', 'desc'));
                this.class3 = this.classesCollection.valueChanges();
            }
        }
        if (sorttt === 3) {
            if (sortttype === 1) {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('mark', 'asc'));
                this.class3 = this.classesCollection.valueChanges();
            } else {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('mark', 'desc'));
                this.class3 = this.classesCollection.valueChanges();
            }
        }
        if (sorttt === 4) {
            if (sortttype === 1) {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('voteCount', 'asc'));
                this.class3 = this.classesCollection.valueChanges();
            } else {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('voteCount', 'desc'));
                this.class3 = this.classesCollection.valueChanges();
            }
        }
        if (sorttt === 5) {
            if (sortttype === 1) {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('maxstudents', 'asc'));
                this.class3 = this.classesCollection.valueChanges();
            } else {
                this.classesCollection = this.firestore.collection<Class>('classes', ref => ref.orderBy('maxstudents', 'desc'));
                this.class3 = this.classesCollection.valueChanges();
            }
        }

    }

}

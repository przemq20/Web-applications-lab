import { Injectable } from '@angular/core';
import { Class } from '../../datamodel/classes.model';
import { ClassesComponent } from '../classes/classes.component';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
// const classes: Class[] = [{
//   name: 'Programowanie obiektowe', sciezka: 'Ścieżka ogólna', icon: 'fas fa-code',
//   ECTS: 4, semester: 3, form: 'L', maxstudents: 22, mark: 4.5
// },
// {
//   name: 'Wprowadzenie do aplikacji internetowych', sciezka: 'Ścieżka wytwarzania oprogramowania', icon: 'fab fa-html5',
//   ECTS: 3, semester: 3, form: 'L', maxstudents: 20, mark: 4.5
// },
// {
//   name: 'Algorytmy geometryczne', sciezka: 'Ścieżka algorytmiczna',
//   icon: 'fas fa-file-code', ECTS: 3, semester: 3, form: 'L',
//   maxstudents: 30, mark: 2.2
// },
// {
//   name: 'Podstawy baz danych', sciezka: 'Ścieżka ogólna', icon: 'fas fa-database',
//   ECTS: 5, semester: 3, form: 'W',
//   maxstudents: 30, mark: 3.1
// },
// {
//   name: 'Programowanie funkcyjne', sciezka: 'Ścieżka ogólna', icon: 'fas fa-code',
//   ECTS: 2, semester: 3, form: 'L',
//   maxstudents: 30, mark: 4.5
// },
// {
//   name: 'Inżynieria wymagań', sciezka: 'Ścieżka wytwarzania oprogramowania',
//   icon: 'fab fa-leanpub', ECTS: 3, semester: 3, form: 'Ć',
//   maxstudents: 30, mark: 2.1
// },
// {
//   name: 'Równania różniczkowe', sciezka: 'Ścieżka ogólna', icon: 'fas fa-infinity',
//   ECTS: 4, semester: 3, form: 'L',
//   maxstudents: 30, mark: 3.5
// },
// {
//   name: 'Analiza 1', sciezka: 'Ścieżka ogólna', icon: 'fas fa-calculator',
//   ECTS: 6, semester: 1, form: 'Ć',
//   maxstudents: 30, mark: 4.0
// },
// {
//   name: 'Analiza 2', sciezka: 'Ścieżka ogólna', icon: 'fas fa-calculator',
//   ECTS: 6, semester: 2, form: 'Ć',
//   maxstudents: 30, mark: 4.5
// },
// {
//   name: 'Komeptencje interpersonalne', sciezka: 'Ścieżka ogólna',
//   icon: 'fab fa-speakap', ECTS: 6, semester: 1, form: 'W',
//   maxstudents: 30, mark: 4.5
// },
// {
//   name: 'Wprowadzenie do informatyki', sciezka: 'Ścieżka ogólna', icon: 'fas fa-tv',
//   ECTS: 6, semester: 1, form: 'Ć',
//   maxstudents: 30, mark: 4.5
// },
// ];

@Injectable({
  providedIn: 'root'
})


export class ClassesserviceService {

  constructor(private firestore: AngularFirestore) { }

  getClasses() {
    return this.firestore.collection('classes').snapshotChanges();
  }

  // getClass(id: number) {
  //   return classes[id - 1];
  // }

  addClass() {

  }

  deleteClass() {

  }
}

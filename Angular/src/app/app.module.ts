import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ClassesComponent } from './classes/classes.component';
import { ProfesorsComponent } from './profesors/profesors.component';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from './class/class.component';
import { ClassesserviceService } from './services/classesservice.service';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { NotloggedComponent } from './notlogged/notlogged.component';
import { UserComponent } from './user/user.component';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ClassesComponent,
    ProfesorsComponent,
    ClassComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NotloggedComponent,
    UserComponent,
    FilterPipe,

  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true }
    // ),
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,

  ],
  providers: [
    ClassesserviceService,
    AuthGuard,
    AuthService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

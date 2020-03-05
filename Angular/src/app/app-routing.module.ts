import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ClassesComponent } from './classes/classes.component';
import { ProfesorsComponent } from './profesors/profesors.component';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from './class/class.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,

},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'admin',
  component: AdminComponent,

},
{
  path: 'classes',
  component: ClassesComponent,
},
{
  path: 'class/:id',
  component: ClassComponent,
},
{
  path: 'profesors',
  component: ProfesorsComponent,
  // canActivate: [AuthGuard]

},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'user',
  component: UserComponent,
  // canActivate: [AuthGuard]
},

{
  path: '**',
  component: PageNotFoundComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  LoginComponent,
  AdminComponent,
  ClassesComponent,
  ClassComponent,
  ProfesorsComponent,
];

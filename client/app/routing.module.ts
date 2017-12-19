import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentsComponent} from './students/students.component';
import { CompanyComponent} from './company/company.component';
import { FirstPageComponent} from './firstpage/firstpage.component';
import { StudentProfile} from './profile-student/profile.component';
import { CompanyProfile} from './company/profile/profile.component';
import { CompanyVacature} from './company/vacature/vacature.component';
import { StudentListComponent} from './student-list/student-list.component';
import { VacatureListComponent} from './vacature-list/vacature-list.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  //First page when you redirect to our website
  { path: '', component: FirstPageComponent},

  //Login for Companies
  { path: 'login/:status', component: LoginComponent },

  //Register for companies and alumni students
  { path: 'register', component: RegisterComponent },

  //Home pages for respectively the students and companies
  { path: 'home-students', component: StudentsComponent},
  { path: 'home-companies', component: StudentsComponent},
  
  //Profile pages for respectively the students and companies
  { path: 'profile-student/:id', component: StudentProfile},
  { path: 'profile-company/:id', component: CompanyProfile},
  
  //This is the way for a student to go to a company profile page from the home page
  { path: 'home-students/profile-company/:id', component: CompanyProfile},

  //This is the way for a student/company to go to a specific vacature page
  { path: 'vacature-company/:id', component: CompanyVacature},
  { path: 'profile-company/:id/vacature-company/:id', component: CompanyVacature},

  //Student list (for the companies) and vacature list (for the students)
  { path: 'student-list', component: StudentListComponent },
  { path: 'vacature-list', component: VacatureListComponent },

  //Redirection to the logout
  { path: 'logout', component: LogoutComponent },

  //Safety for if a page is routed to that is not found
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },

  //{ path: 'cats', component: CatsComponent },
  //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  //{ path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] }, 

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}

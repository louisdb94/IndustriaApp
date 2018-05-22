import { NgModule } from '@angular/core';
import { RouterModule, Routes, Params } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { SendMailComponent } from './login/send-mail/send-mail.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomepageComponent} from './homepage/homepage.component';
import { CompanyComponent} from './company/company.component';
import { FirstPageComponent} from './firstpage/firstpage.component';
import { StudentProfile} from './student/profile.component';
import { CompanyProfile} from './company/profile/profile.component';
import { CompanyVacature} from './company/vacature/vacature.component';
import { StudentListComponent} from './student/student-list/student-list.component';
import { VacatureListComponent} from './company/vacature-list/vacature-list.component';
import { SettingsComponent} from './settings/settings.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';


const routes: Routes = [
  //First page when you redirect to our website
  { path: '', component: FirstPageComponent},

  //Login for Companies
  { path: 'login/:status', component: LoginComponent },

  //Register for companies and alumni students
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'sendmail/:token', component: SendMailComponent },
  //Home pages for respectively the students and companies
  { path: 'home-students', component: HomepageComponent},
  { path: 'home-students/:id', component: HomepageComponent},
  { path: 'home-companies', component: HomepageComponent},

  //Profile pages for respectively the students and companies
  { path: 'profile-student/:id',
    component: StudentProfile,
    // canActivate: [AuthGuardAdmin],
    // data: {
    //   expectedRole: 'Company'
    // }
  },
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

  //Settings Component
  { path: 'settings', component: SettingsComponent},

  //Safety for if a page is routed to that is not found
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },



];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}

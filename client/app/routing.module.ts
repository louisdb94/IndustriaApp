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
import { StudentListComponent} from './student-list/student-list.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  // { path: '', component: AboutComponent },
  // { path: '', component: FirstPageComponent },
  { path: '', component: RegisterComponent },
  { path: 'students', component: StudentsComponent},
  { path: 'firstpage', component: FirstPageComponent},
  { path: 'profile-student/:id', component: StudentProfile},
  { path: 'profile-company/:id', component: CompanyProfile},
  { path: 'company', component: CompanyComponent},
  { path: 'cats', component: CatsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },



];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}

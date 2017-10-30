import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { StudentService } from './services/student.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
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
import { NavBarComponent} from './nav-bar/nav-bar.component';
import { StudentsDetailComponent} from './students-detail/students-detail.component';

import { StudentProfile } from './profile-student';
import { HeaderProfile } from './profile-student/profile-header';
import { BioProfile } from './profile-student/profile-bio';
import { EducationProfile } from './profile-student/profile-education';
import { SkillsProfile } from './profile-student/profile-skills';
import { FooterProfile } from './profile-student/profile-footer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule,NgModelGroup, NgForm } from '@angular/forms';

import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
import { jqxEditorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxeditor';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDateTimeInput';

import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    StudentsComponent,
    StudentsDetailComponent,
    CompanyComponent,
    NavBarComponent,

    StudentProfile,
    HeaderProfile,
    BioProfile,
    EducationProfile,
    SkillsProfile,
    FooterProfile,

    jqxFileUploadComponent,
    jqxEditorComponent,
    jqxProgressBarComponent,
    jqxInputComponent,
    jqxDropDownListComponent,
    jqxDateTimeInputComponent,
    ImageCropperComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    StudentService

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

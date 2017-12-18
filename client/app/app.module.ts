import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { StudentService } from './services/student.service';
import { FileService } from './services/file.service';
import { AuthService } from './services/auth.service';

import { CvsService } from './services/cvs.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { LanguageService } from './services/language.service';
import { ProfessionalService } from './services/professional.service';
import { SkillService } from './services/skill.service';
import { SocialmediaService } from './services/socialmedia.service';
import { ContactService } from './services/contact.service';
import { CompanyService} from './services/company/company.service';
import { VacatureService} from './services/company/vacature.service';
import { EventsService} from './services/admin/events.service';


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
import { FirstPageComponent} from './firstpage/firstpage.component';
import { StudentListComponent} from './student-list/student-list.component';

import { StudentProfile } from './profile-student';
import { HeaderProfile } from './profile-student/profile-header';
import { BioProfile } from './profile-student/profile-bio';
import { EducationProfile } from './profile-student/profile-education';
import { SkillsProfile } from './profile-student/profile-skills';
import { ProfessionalProfile } from './profile-student/profile-professional';
import { LanguageProfile } from './profile-student/profile-language';
import { ContactProfile } from './profile-student/profile-contact';
import { FooterProfile } from './profile-student/profile-footer';
import { ExperiencesProfile } from './profile-student/profile-experiences';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


import { CompanyProfile } from './company/profile/profile.component';
import { CompanyHeaderProfile } from './company/profile/profile-header';
import { CompanyBioProfile } from './company/profile/profile-bio';


import { FormsModule, ReactiveFormsModule,NgModelGroup, NgForm } from '@angular/forms';

import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
import { jqxEditorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxeditor';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDateTimeInput';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { DataTableModule } from "ng2-data-table";

import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {FileUploadModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import { CalendarModule } from 'angular-calendar';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarHeaderComponent} from './students/utils/calendar-header.component';
import { DateTimePickerComponent} from './students/utils/date-time-picker.component';
import {UtilsModule} from './students/utils/module';


import {NgxPaginationModule} from 'ngx-pagination';


import { FilterPipe} from './pipes/student-list.pipe';
import { FilterSkill} from './pipes/filterSkill.pipe';
import { FilterProfessional} from './pipes/filterProfessional.pipe';
import { FilterLanguage} from './pipes/filterLanguage.pipe';


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
    CompanyComponent,
    NavBarComponent,
    FirstPageComponent,
    StudentListComponent,

    StudentProfile,
    HeaderProfile,
    BioProfile,
    EducationProfile,
    ExperiencesProfile,
    SkillsProfile,
    ProfessionalProfile,
    LanguageProfile,
    ContactProfile,
    FooterProfile,

    CompanyProfile,
    CompanyHeaderProfile,
    CompanyBioProfile,

    jqxFileUploadComponent,
    jqxEditorComponent,
    jqxProgressBarComponent,
    jqxInputComponent,
    jqxDropDownListComponent,
    jqxDateTimeInputComponent,
    ImageCropperComponent,
    CalendarHeaderComponent,
    DateTimePickerComponent,

    FileSelectDirective,
    FilterPipe,
    FilterSkill,
    FilterProfessional,
    FilterLanguage

  ],
  imports: [
    RoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTableModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    UtilsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FileUploadModule,
    DropdownModule,
    OrderListModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    StudentService,
    FileService,
    DataService,
    CompanyService,
    VacatureService,
    EventsService,

    CvsService,
    EducationService,
    ExperienceService,
    LanguageService,
    ProfessionalService,
    SkillService,
    SocialmediaService,
    ContactService



  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

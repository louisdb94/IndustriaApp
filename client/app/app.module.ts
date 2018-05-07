import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { StudentService } from './services/student.service';
import { FileService } from './services/file.service';
import { AuthService } from './services/auth.service';
import { MailService } from './services/mail.service';

import { CvsService } from './services/cvs.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { LanguageService } from './services/language.service';
import { ProfessionalService } from './services/professional.service';
import { SkillService } from './services/skill.service';
import { SocialmediaService } from './services/socialmedia.service';
import { ContactService } from './services/contact.service';
import { CompanyService } from './services/company/company.service';
import { VacatureService } from './services/company/vacature.service';
import { EventsService } from './services/admin/events.service';
import { PrivacylogService } from './services/admin/privacylog.service';
import { ParametersService } from './services/admin/parameters.service';
import { AdminCompanycontactService} from './services/admin/admin_companycontact.service';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { SendMailComponent } from './login/send-mail/send-mail.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompanyComponent } from './company/company.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FirstPageComponent } from './firstpage/firstpage.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { VacatureListComponent } from './company/vacature-list/vacature-list.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './settings/admin/admin.component';

import { StudentProfile } from './student';
import { HeaderProfile } from './student/profile-header';
import { BioProfile } from './student/profile-bio';
import { EducationProfile } from './student/profile-education';
import { SkillsProfile } from './student/profile-skills';
import { ProfessionalProfile } from './student/profile-professional';
import { LanguageProfile } from './student/profile-language';
import { ContactProfile } from './student/profile-contact';
import { FooterProfile } from './student/profile-footer';
import { ExperiencesProfile } from './student/profile-experiences';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


import { CompanyProfile } from './company/profile/profile.component';
import { CompanyHeaderProfile } from './company/profile/profile-header';
import { CompanyBioProfile } from './company/profile/profile-bio';
import { CompanyContactProfile } from './company/profile/profile-contact';
import { CompanyVacatureProfile } from './company/profile/profile-vacature';
import { CompanyVacature } from './company/vacature/vacature.component';
import { CompanyHeaderVacature } from './company/vacature/vacature-header';
import { CompanyAboutVacature } from './company/vacature/vacature-about';
import { CompanyContactVacature } from './company/vacature/vacature-contact';
import { CompanyRequirementVacature } from './company/vacature/vacature-requirement';

import { CompanyContactService } from './services/company/contact.service';
import { CompanyRequirementService } from './services/company/requirement.service';

import { FormsModule, ReactiveFormsModule, NgModelGroup, NgForm } from '@angular/forms';

import { DataTableModule } from "ng2-data-table";


import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FileUploadModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { CalendarModule } from 'angular-calendar';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarHeaderComponent } from './homepage/utils/calendar-header.component';
import { DateTimePickerComponent } from './homepage/utils/date-time-picker.component';
import { UtilsModule } from './homepage/utils/module';


import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';

import { FilterPipe } from './pipes/student-list.pipe';
import { FilterSkill } from './pipes/filterSkill.pipe';
import { FilterProfessional } from './pipes/filterProfessional.pipe';
import { FilterLanguage } from './pipes/filterLanguage.pipe';
import { FilterVacature } from './pipes/filterVacatures.pipe';
import { FilterDegree } from './pipes/filterDegree.pipe';


import { ScrollToModule } from 'ng2-scroll-to';
import { RequestInterceptorService } from './services/request-interceptor.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    SendMailComponent,
    LogoutComponent,
    NotFoundComponent,
    HomepageComponent,
    CompanyComponent,
    NavBarComponent,
    FirstPageComponent,
    StudentListComponent,
    VacatureListComponent,
    SettingsComponent,
    AdminComponent,

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
    CompanyContactProfile,
    CompanyVacatureProfile,
    CompanyVacature,
    CompanyHeaderVacature,
    CompanyAboutVacature,
    CompanyContactVacature,
    CompanyRequirementVacature,
    CalendarHeaderComponent,
    DateTimePickerComponent,

    FilterPipe,
    FilterSkill,
    FilterProfessional,
    FilterLanguage,
    FilterVacature,
    FilterDegree

  ],
  imports: [
    RoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTableModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD91Mh-sJ__BIEbxl-KhalMoEn64TviLwY",
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
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
    NgxPaginationModule,
    ScrollToModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    StudentService,
    FileService,
    DataService,
    CompanyService,
    VacatureService,
    EventsService,
    PrivacylogService,
    ParametersService,
    AdminCompanycontactService,
    MailService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    CvsService,
    EducationService,
    ExperienceService,
    LanguageService,
    ProfessionalService,
    SkillService,
    SocialmediaService,
    ContactService,

    CompanyContactService,
    CompanyRequirementService

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

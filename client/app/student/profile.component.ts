import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SkillService} from '../services/skill.service';
import { LanguageService} from '../services/language.service';
import { ContactService} from '../services/contact.service';
import { ProfessionalService} from '../services/professional.service';



@Component({
  selector: 'profile-student',  // <home></home>
  styleUrls: [ './profile.component.scss' ],
  templateUrl: './profile.component.html'
})
export class StudentProfile implements OnInit {

  constructor(  private studentService: StudentService,
                private skillService : SkillService,
                private professionalService : ProfessionalService,
                private languageService : LanguageService,
                private contactService : ContactService,
                public auth: AuthService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent) {}

  student: any;
  countEducation: Number;
  countExperiences: Number;
  contactChecked: boolean;

  //messageId: String;
  //messageNav: String;

  skills = [];
  professional = [];
  languages = [];
  contacts = [];
  id : Number;

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  ngOnInit() {

    if(this.auth.loggedIn == false ){
      this.auth.loginStudent(localStorage.getItem('token'));
    }

    this.translate.setDefaultLang('en');
    this.activatedRoute.params.subscribe((params: Params) => {
      let id1 = params['id'];
      this.id = JSON.parse(id1);
      this.getStudentByIdMySql(this.id);
      this.getskillbyid(this.id);
      this.getProfessionalbyid(this.id);
      this.getLanguagebyid(this.id);
      this.getContactbyid(this.id);
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getStudentByIdMySql(id) {
    this.studentService.getStudentByIdMysql(id).subscribe(
      data => {
        this.student = data[0];
        this.countEducation = data[0].countEducation;
        this.countExperiences = data[0].countExperiences;
        this.contactChecked = data[0].contactChecked;
      },
      error => console.log(error),
    );
  }

  getskillbyid(id){
    this.skillService.getSkillByStudentId(id).subscribe(
      data => {
        this.skills = data;
      },
      error => console.log(error)
    )
  }

  getLanguagebyid(id){
    this.languageService.getLanguageByStudentId(id).subscribe(
      data => {
        this.languages = data;
      },
      error => console.log(error)
    )
  }

  getContactbyid(id){
    this.contactService.getContactByStudentId(id).subscribe(
      data => {
        this.contacts = data;
      },
      error => console.log(error)
    )
  }

  getProfessionalbyid(id){
    this.professionalService.getProfessionalByStudentId(id).subscribe(
      data => {
        this.professional = data;
      },
      error => console.log(error)
    )
  }
}

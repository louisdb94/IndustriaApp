import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
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
                public dataService: DataService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent) {}

  data: any;
  student: any;
  experiences = [];
  countEducation: Number;
  countExperiences: Number;
  contactChecked: boolean;

  messageId: String;
  messageNav: String;

  skills = [];
  professional = [];
  languages = [];
  contacts = [];
  id : Number;

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  ngOnInit() {

    this.dataService.idMessage.subscribe(message => this.messageId = message);
    this.dataService.navMessage.subscribe(message => this.messageNav = message);

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
        let result = this.dataService.decryption(data);
        this.student = result[0];
        this.countEducation = result[0].countEducation;
        this.countExperiences = result[0].countExperiences;
        this.contactChecked = result[0].contactChecked;
      },
      error => console.log(error),
    );
  }

  getskillbyid(id){
    this.skillService.getSkillByStudentId(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.skills = result;
      },
      error => console.log(error)
    )
  }

  getLanguagebyid(id){
    this.languageService.getLanguageByStudentId(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.languages = result;
      },
      error => console.log(error)
    )
  }

  getContactbyid(id){
    this.contactService.getContactByStudentId(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.contacts = result;
      },
      error => console.log(error)
    )
  }

  getProfessionalbyid(id){
    this.professionalService.getProfessionalByStudentId(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.professional = result;
      },
      error => console.log(error)
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { StudentService } from '../services/student.service';
import { DataService } from '../services/data.service';
import { CvsService} from '../services/cvs.service';
import { EducationService} from '../services/education.service';
import { ExperienceService} from '../services/experience.service';
import { LanguageService} from '../services/language.service';
import { SkillService} from '../services/skill.service';
import { SocialmediaService} from '../services/socialmedia.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  userForm: FormGroup;
  user_fk = new FormControl(Number);
  rnumber = new FormControl('', []);

  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  emailStudent = "";
  passwordStudent = "";
  id_user: Number;
  messageId: String;
  dataRnumber: String;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private studentService: StudentService,
              private userService: UserService,
              private dataService: DataService,
              private cvsService: CvsService,
              private educationService: EducationService,
              private experienceService: ExperienceService,
              private languageService: LanguageService,
              private skillService: SkillService,
              private socialmediaService: SocialmediaService,
              private appcomponent: AppComponent,
              private http: HttpClient,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      rnumber: this.rnumber,
      email: this.email,
      password: this.password,
    });

    this.userForm = this.formBuilder.group({
      rnumber: this.rnumber,
      user_fk: this.user_fk
    });

    this.dataService.id_user.subscribe(message => this.id_user = message);
    this.dataService.idMessage.subscribe(message => this.messageId = message);
    this.dataService.dataRnumber.subscribe(message => this.dataRnumber = message);
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  switchLanguage(language) {
    this.appcomponent.switchLanguage(language);
  }

  register() {
    // this.dataService.changeRnumber(this.emailStudent.substring(0,8))
    // this.userForm.value.rnumber = this.emailStudent.substring(0,8);
    // this.userForm.value.user_fk = 50;
    this.registerForm.value.rnumber = this.emailStudent.substring(0,8);
    this.registerForm.value.email = this.emailStudent;
    this.registerForm.value.password = this.passwordStudent;
    console.log(this.registerForm.value);

    let student_result : any;
    this.userService.registerMysql(this.registerForm.value)
        .switchMap( userid =>
          this.studentService.addStudentFromUserId(JSON.parse(userid._body).insertId)
            .switchMap(studentid =>
                 this.cvsService.addCvsFromStudentId(JSON.parse(studentid._body).insertId)
                 .switchMap(educ =>
                      this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                      .switchMap(educ =>
                        this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                        .switchMap(educ =>
                          this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                          .switchMap(educ =>
                            this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                            .switchMap(educ =>
                              this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                              .switchMap(educ =>
                                this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                                .switchMap(educ =>
                                  this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                                  .switchMap(educ =>
                                    this.educationService.addEducationFromStudentId(JSON.parse(studentid._body).insertId)
                                    .switchMap(exper =>
                                        this.experienceService.addExperienceFromStudentId(JSON.parse(studentid._body).insertId)
                                        .switchMap(lang =>
                                              this.languageService.addLanguageFromStudentId(JSON.parse(studentid._body).insertId)
                                              .switchMap(socia =>
                                                  this.socialmediaService.addSocialmediaFromStudentId(JSON.parse(studentid._body).insertId)
                                                  .switchMap(socia =>
                                                    this.socialmediaService.addSocialmediaFromStudentId(JSON.parse(studentid._body).insertId)
                                                    .switchMap(socia =>
                                                      this.socialmediaService.addSocialmediaFromStudentId(JSON.parse(studentid._body).insertId)
                                                      .switchMap(socia =>
                                                        this.socialmediaService.addSocialmediaFromStudentId(JSON.parse(studentid._body).insertId)
                                                        .switchMap(skil =>
                                                          this.skillService.addSkillFromStudentId(JSON.parse(studentid._body).insertId)

                 .map(result => ({
                   user_id : JSON.parse(userid._body).insertId,
                   student_id : JSON.parse(studentid._body).insertId
                 })))))))))))))))))))
        .subscribe(
          res => { this.toast.setMessage('you successfully registered!', 'success'); this.router.navigate(['/login']);},
          error => console.log(error)
        )


//WORKSSSS

    // this.userService.registerMysql(this.registerForm.value).subscribe(
    //   res => {
    //     this.toast.setMessage('you successfully registered!', 'success');
    //     this.userService.getUserMysql(this.registerForm.value.rnumber).subscribe(
    //       data => {this.dataService.changeUserId(data[0].id), console.log(data[0].id)}
    //     );
    //
    //     // console.log(this.dataService.id_user);
    //     // this.dataService.id_user.subscribe(
    //     //   value => {console.log(value), this.userForm.value.user_fk = value}
    //     // );
    //
    //     // this.studentService.addStudentMysql(this.userForm.value).subscribe(
    //     //   res => {console.log("New student created")},
    //     //   error => console.log(error)
    //     // );
    //
    //     this.router.navigate(['/login']);
    //   },
    //   error => this.toast.setMessage('email already exists', 'danger')
    // );
  }

}

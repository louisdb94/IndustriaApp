import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { StudentService } from '../services/student.service';
import { CompanyService } from '../services/company/company.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users = [];
  user = {};
  emailStudent = "";
  passwordStudent = "";
  id: any;
  dataRnumber: String;
  id_user: Number;
  value: Number;

  userForm: FormGroup;
  user_fk = new FormControl(Number);
  rnumber = new FormControl('', []);

  loginForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(50)
  ]);

  constructor(public auth: AuthService,
              private userService: UserService,
              private studentService: StudentService,
              private companyService: CompanyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private appcomponent: AppComponent,
              private activatedRoute: ActivatedRoute,
              public toast: ToastComponent) { }

  ngOnInit() {
    if(this.auth.currentUser.role == "Company"){
      this.router.navigate(['/home-companies']);
    }
    if(this.auth.currentUser.role == "Student"){
      this.router.navigate(['/home-students']);
    }

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

    this.userForm = this.formBuilder.group({
      rnumber: this.rnumber,
      user_fk: this.user_fk
    });
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

  login() {
    let company_email = this.emailStudent;
    this.userForm.value.rnumber = this.emailStudent.substring(0,8);
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['status'] == "student"){
        this.studentService.getStudentByRnumberMysql(this.userForm.value.rnumber).subscribe(
          data => {
            this.id = data[0].id;
            this.auth.login(this.loginForm.value).subscribe(
              res => {this.router.navigate(['/home-students'])},
              error => {this.toast.setMessage('invalid email or password!', 'danger')}
            );
          },
          error => console.log("error")
        );
      }

      if(params['status'] == "company"){
        this.companyService.getCompanyByEmailMysql(this.emailStudent).subscribe(
          data => {
            data = JSON.parse(data._body);
            if(data[0]){
              this.id = data[0].id;
              this.auth.login(this.loginForm.value).subscribe(
                res => {this.router.navigate(['/home-companies'])},
                error => {this.toast.setMessage('invalid email or password!', 'danger')}
              );
            }
            else{
              this.toast.setMessage('invalid email or password!', 'danger');
            }
          }
        );
      }
    });
  }

  addTip(){
    this.toast.setMessage('Format is r0123456@kuleuven.be', 'info');
  }
}

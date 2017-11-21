import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { StudentService } from '../services/student.service';
import { DataService } from "../services/data.service";
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
  messageId: String;
  messageNav: boolean;
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

  constructor(private auth: AuthService,
              private userService: UserService,
              private studentService: StudentService,
              private data: DataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private appcomponent: AppComponent,
              public toast: ToastComponent) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.studentService.getStudentByRnumber(this.auth.currentUser.rnumber).subscribe(
        data => (this.id = data._id, this.data.changeMessageId(data._id), this.data.changeMessageNav(true), console.log("data: ", this.id)),
        error => console.log("error")
      );

      this.router.navigate(['/students']);
    }

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

    this.userForm = this.formBuilder.group({
      rnumber: this.rnumber,
      user_fk: this.user_fk
    });

    this.data.idMessage.subscribe(message => this.messageId = message);
    this.data.navMessage.subscribe(message => this.messageNav = message);
    this.data.id_user.subscribe(message => this.id_user = message);
    this.data.dataRnumber.subscribe(message => this.dataRnumber = message);

    console.log(this.data.id_user);
    this.data.id_user.subscribe(
      value => {console.log("user_fk: ",value), this.userForm.value.user_fk = value}
    );

    this.data.dataRnumber.subscribe(
      value => {console.log("rnumber: ", value), this.userForm.value.rnumber = value}
    );
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

    this.studentService.addStudentMysql(this.userForm.value).subscribe(
      res => {console.log("New student created")},
      error => console.log(error)
    );
  }

  test(){
    console.log(this.userForm.value.rnumber);
    this.userForm.value.rnumber = this.emailStudent.substring(0,8);
    this.studentService.getStudentByRnumberMysql(this.userForm.value.rnumber).subscribe(
      data => (this.id = data[0].id, this.data.changeMessageId(data[0].id), this.data.changeMessageNav(true), console.log("data: ", this.id)),
      error => console.log("error")
    );
      
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/students']),
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }
}

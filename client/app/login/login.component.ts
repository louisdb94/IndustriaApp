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
  rnumber: String;
  id: any;
  messageId: String;
  messageNav: boolean;
  loginForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    // Validators.required,
    // Validators.minLength(6),
    // Validators.maxLength(50)
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

    this.data.idMessage.subscribe(message => this.messageId = message);
    this.data.navMessage.subscribe(message => this.messageNav = message);
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
    this.rnumber = this.emailStudent.substring(0,8);
    console.log(this.rnumber);
    this.studentService.getStudentByRnumber(this.rnumber).subscribe(
      data => (this.id = data._id, this.data.changeMessageId(data._id), this.data.changeMessageNav(true), console.log("data: ", this.id)),
      error => console.log("error")
    );
      
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/students']),
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  addTip(){
    this.toast.setMessage('Format is r0xxxxxx@kuleuven.be => r0123456@kuleuven.be', 'info')
  }
}

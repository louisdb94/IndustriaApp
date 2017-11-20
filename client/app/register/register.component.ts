import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { StudentService } from '../services/student.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
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

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private studentService: StudentService,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      rnumber: this.rnumber,
      email: this.email,
      password: this.password
    });
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  addStudent(){
    this.studentService.addStudent(this.registerForm.value).subscribe(
      res => {console.log("New student created")},
      error => console.log(error)
    );
  }

  register() {
    this.registerForm.value.rnumber = this.emailStudent.substring(0,8);
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.addStudent();
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}

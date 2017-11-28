import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CompanyService} from '../services/company/company.service';
import { VacatureService} from '../services/company/vacature.service';
import { UserService} from '../services/user.service';
import { DataService } from "../services/data.service";
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {DropdownModule} from 'primeng/primeng';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students = [];
  student = {};
  rnumber: String;
  messageId: String;

  companies = [];

  addStudentForm: FormGroup;
  addUserForm: FormGroup;
  name = new FormControl('', Validators.required);
  degree = new FormControl('', Validators.required);
  gradYear = new FormControl('', Validators.required);
  user_fk = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);


  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  constructor(private studentService: StudentService,
              private data: DataService,
              private userService : UserService,
              private companyService : CompanyService,
              private vacatureService : VacatureService,
              public auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }
              public toast: ToastComponent) {

              }

  ngOnInit() {

    // if (this.auth.loggedIn) {
    //   this.studentService.getStudentByRnumber(this.auth.currentUser.rnumber).subscribe(
    //     data => (this.data.changeMessageId(data._id), this.data.changeMessageNav(true)),
    //     error => console.log("error")
    //   );
    // }

    this.getStudentsMysql();
    this.addStudentForm = this.formBuilder.group({
      name: this.name,
      degree: this.degree,
      gradYear: this.gradYear,
      user_fk : this.user_fk
    });

    this.addUserForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      role: this.role,
    });

    this.data.idMessage.subscribe(message => this.messageId = message)

    this.getCompanies();

  }
  getStudentsMysql() {
    this.studentService.getStudentsMysql().subscribe(
      data => {this.students = data},
      error => console.log(error)
    );

  }

  getCompanies(){
    this.userService.getUserByRoleMysql().subscribe(
      data => {this.companies = data},
      error => console.log(error)
    )
  }

  addStudent() {
    this.studentService.addStudentMysql(this.addStudentForm.value).subscribe(
      res => {
        const newStudent = res.json();
        this.students.push(newStudent);
        this.addStudentForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  addCompany() {
    // this.userService.registerMysql(this.addUserForm.value).subscribe(
    //   res => {
    //     const newStudent = res.json();
    //     this.students.push(newStudent);
    //     this.addStudentForm.reset();
    //     this.toast.setMessage('item added successfully.', 'success');
    //   },
    //   error => console.log(error)
    // );

    console.log(this.addUserForm.value);

    this.userService.registerMysql(this.addUserForm.value)
        .switchMap( userid =>
          this.companyService.addCompanyFromUserId(JSON.parse(userid._body).insertId)
            .switchMap(companyid => this.vacatureService.addVacatureFromCompanyId(JSON.parse(companyid._body).insertId)
                 .map(result => ({
                   user_id : JSON.parse(userid._body).insertId,
                   companyid: JSON.parse(companyid._body).insertId
                 }))))
        .subscribe(
          res => { this.toast.setMessage('successfully added!', 'success'); console.log(res)},
          error => console.log(error)
        )
  }



}

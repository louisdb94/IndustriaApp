import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { DataService } from "../services/data.service";
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {ScheduleModule} from 'primeng/primeng';



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
  events = [];

  addStudentForm: FormGroup;
  name = new FormControl('', Validators.required);
  degree = new FormControl('', Validators.required);
  gradYear = new FormControl('', Validators.required);

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  constructor(private studentService: StudentService,
              private data: DataService,
              public auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {

    if (this.auth.loggedIn) {
      this.studentService.getStudentByRnumber(this.auth.currentUser.rnumber).subscribe(
        data => (this.data.changeMessageId(data._id), this.data.changeMessageNav(true)),
        error => console.log("error")
      );
    }

    this.getStudents();
    this.addStudentForm = this.formBuilder.group({
      name: this.name,
      degree: this.degree,
      gradYear: this.gradYear
    });

    this.data.idMessage.subscribe(message => this.messageId = message)

  }


  getStudents() {
    this.studentService.getStudents().subscribe(
      data => this.students = data,
      error => console.log(error)
    );
  }

  addStudent() {
    this.studentService.addStudent(this.addStudentForm.value).subscribe(
      res => {
        const newStudent = res.json();
        this.students.push(newStudent);
        this.addStudentForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}

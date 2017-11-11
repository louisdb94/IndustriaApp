import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students = [];
  student = {};

  addStudentForm: FormGroup;
  name = new FormControl('', Validators.required);
  degree = new FormControl('', Validators.required);
  gradYear = new FormControl('', Validators.required);

  constructor(private studentService: StudentService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getStudents();
    this.addStudentForm = this.formBuilder.group({
      name: this.name,
      degree: this.degree,
      gradYear: this.gradYear
    });
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

  viewStudent(){

  }
}

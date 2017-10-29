import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }
  getStudents() {
    this.studentService.getStudents().subscribe(
      data => this.students = data,
      error => console.log(error)
    );
  }

  viewStudent(){

  }
}

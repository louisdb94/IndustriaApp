import { Component, OnInit } from '@angular/core';
import {StudentService} from '../services/student.service';
import {OrderListModule} from 'primeng/primeng';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor( private studentService: StudentService) { }

  students = [];
  filteredData = [];

  ngOnInit() {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getStudentsMysql().subscribe(
      data => {this.students = data, this.filteredData = data, console.log(data)},
      error => console.log(error)
    )
  }
  search(val: any) {
    if (!val) this.filteredData = this.filteredData;

    for(let i = 0; i < this.students.length ; i++){
    this.filteredData = this.filteredData[i].filter(d => d.indexOf(val) >= 0);}
  }

}

import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss']
})
export class StudentsDetailComponent implements OnInit {

  student= {};

  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getStudentById(id);
    });
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe(
      data => this.student = data,
      error => console.log(error)
    );
  }
  @ViewChild('fileInput') fileInput;
  private upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('files', fileBrowser.files[0]);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/Data/UploadFiles', true);
      xhr.onload = function () {
        if (this['status'] === 200) {
            const responseText = this['responseText'];
            const files = JSON.parse(responseText);
            //todo: emit event
        } else {
          //todo: error handling
        }
      };
      xhr.send(formData);
    }
  }
}

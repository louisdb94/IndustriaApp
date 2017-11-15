import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { ToastComponent } from '../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'profile-student',  // <home></home>
  styleUrls: [ './profile.component.scss' ],
  templateUrl: './profile.component.html'
})
export class StudentProfile implements OnInit {

  constructor(private studentService: StudentService, private translate: TranslateService, private activatedRoute: ActivatedRoute,
    public toast: ToastComponent) {}

  data: any;
  student: {};
  experiences = [];
  countEducation: Number;
  countExperiences: Number;

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getStudentById(id);
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe(
      data => {this.student = data, this.experiences = data.experiences, this.countEducation = data.countEducation, this.countExperiences = data.countExperiences},
      error => console.log(error),
    );
  }
}

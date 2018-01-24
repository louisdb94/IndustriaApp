import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { EducationService } from '../../services/education.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import education from '../../../../server/models_mysql/students/education';


@Component({
  selector: 'profile-education',  // <home></home>
  styleUrls: [ './profile-education.component.scss' ],
  templateUrl: './profile-education.component.html'
})
export class EducationProfile {

  public editMode = false;
  data: any;
  student_id: Number;
  education = [];
  countEducation = 0;
  @Input() student: any;

  constructor(  private studentService: StudentService,
                private educationService: EducationService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private http: HttpClient,
                public auth : AuthService){}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.student_id = params['id'];
      this.getEducationById(this.student_id);
    });
  }

  getEducationById(id){
    this.educationService.getEducationById(id).subscribe(
      data => {this.education = data},
      error => console.log(error)
    );
  }

  save(student, education){

        this.editMode = false;
        let count = student.countEducation;

        for(let i = 0; i <= count; i++){
          if(this.education[i]){
            this.educationService.editEducation(this.education[i]).subscribe(
              res => {},
              error => console.log(error)
            );
          }
        }

        this.studentService.editStudentMysql(student).subscribe(
          res => {
            this.student = student;
            this.toast.setMessage('item edited successfully.', 'success');
          },
          error => console.log(error)
        );
      }

  add(student){
    if (student.countEducation <= 6) {
      this.http.get(`/api/education-insert/${student.id}`).subscribe(
        res => {this.getEducation(student.id)},
        error => {console.log("error")}
      );
      student.countEducation++;
    }
  }

  getEducation(id){
    this.educationService.getEducationById(id).subscribe(
      res => {this.education = res}
    )
  }

  delete(student, education){
    if (student.countEducation > 0) {
      let id = education[education.length - 1].id;
      student.countEducation--;
      this.education.splice(education.length - 1, 1);
      this.http.get(`/api/education-delete/${id}`).subscribe(
        res => {this.save(student, education)}
      );
    }
  }
}

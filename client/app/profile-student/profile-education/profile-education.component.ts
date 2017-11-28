import { Component, OnInit, Input } from '@angular/core';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDateTimeInput';
import { StudentService } from '../../services/student.service';
import { EducationService } from '../../services/education.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';


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
  @Input() student: {};

  constructor(private studentService: StudentService, private educationService: EducationService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent){}

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

        for(let i = 0; i < count; i++){
          console.log(this.education[i]);
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
    console.log("student", this.student);
    console.log("student", this.countEducation);
    if(student.countEducation < 8){
      this.countEducation++;
      student.countEducation++;
    }
  }

  delete(student){
    if(student.countEducation > 0){
      student.countEducation--;
      this.countEducation--;
    }
  }
    
}
import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { EducationService } from '../../services/education.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  registerForm: FormGroup;
  type = new FormControl(String);
  institution = new FormControl(String);
  date_from = new FormControl(String);
  date_until = new FormControl(String);
  student_fk = new FormControl(String);

  constructor(  private studentService: StudentService,
                private educationService: EducationService,
                private dataService: DataService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private http: HttpClient,
                private formBuilder: FormBuilder,
                public auth : AuthService){}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.student_id = params['id'];
      this.getEducationById(this.student_id);
    });

    this.registerForm = this.formBuilder.group({
      type: this.type,
      institution: this.institution,
      date_from: this.date_from,
      date_until: this.date_until,
      student_fk: this.student_fk,
    });
  }

  getEducationById(id){
    this.educationService.getEducationById(id).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.education = data;
      },
      error => console.log(error)
    );
  }

  save(student, education){

        this.editMode = false;
        let count = student.countEducation;
        for(let i = 0; i <= count; i++){
          if(this.education[i]){
            // this.registerForm.value.type = this.education[i].type;
            // this.registerForm.value.institution = this.education[i].institution;
            // this.registerForm.value.date_from = this.education[i].date_from;
            // this.registerForm.value.date_until = this.education[i].date_until;
            // this.registerForm.value.student_fk = this.education[i].student_fk;
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
      this.registerForm.value.type = 'Master Example';
      this.registerForm.value.institution = 'KULeuven example';
      this.registerForm.value.date_from = '2018';
      this.registerForm.value.date_until = '2018';
      this.registerForm.value.student_fk = student.id;

      this.educationService.addEducationFromStudentId(this.registerForm.value).subscribe(
          res => {
            student.countEducation++;
            this.getEducationById(student.id);
            this.save(student, null);
        //    this.getEducation(student.id)
          },
          error => {console.log("error")}
      );
    }
  }

  getEducation(id){
    this.educationService.getEducationById(id).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.education = data;
      }
    )
  }

  delete(student, education){
    if (student.countEducation > 0) {
      let id = education[education.length - 1].id;
      student.countEducation--;
      this.education.splice(education.length - 1, 1);
      this.educationService.deleteEducation(id).subscribe(
        res => {this.save(student, education)}
      );
    }
  }
}

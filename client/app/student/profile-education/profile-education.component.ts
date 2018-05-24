import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { EducationService } from '../../services/education.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'profile-education',  // <home></home>
  styleUrls: [ './profile-education.component.scss' ],
  templateUrl: './profile-education.component.html'
})
export class EducationProfile {

  public editMode = false;
  student_id: Number;
  education = [];
  @Input() student: any;

  registerForm: FormGroup;
  type = new FormControl(String);
  institution = new FormControl(String);
  date_from = new FormControl(String);
  date_until = new FormControl(String);
  student_fk = new FormControl(String);

  constructor(  private studentService: StudentService,
                private educationService: EducationService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private formBuilder: FormBuilder,
                public auth : AuthService){}

  ngOnInit() {
    //Subscribe to the id of the student
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
    console.log(student.countEducation);
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
          },
          error => {console.log("error")}
      );
    }
  }

  getEducation(id){
    this.educationService.getEducationById(id).subscribe(
      data => {
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

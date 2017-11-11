import { Component, OnInit, Inject, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {StudentProfile} from '../profile.component';


@Component({
  selector: 'profile-experiences',  // <home></home>
  styleUrls: [ './profile-experiences.component.scss' ],
  templateUrl: './profile-experiences.component.html'
})
export class ExperiencesProfile {

  exp1: String;
  exp2: String;
  exp3: String;

  public valueInput : number;
  public isUpdated = false;
  public editMode = false;

  experience = {};

  @Input() student: {};
  @Input() experiences: [String];

  constructor(private studentService: StudentService, private studentProfile: StudentProfile,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent){}

  save(student){
    this.editMode = false;

    this.studentService.editStudent(student).subscribe(
      res => {
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  edit(){
    this.editMode = true;
  }

  addExperience(exp1, exp2, exp3) {
    this.experiences.push(this.exp1);
    this.experiences.push(this.exp2);
    this.experiences.push(this.exp3);
    this.save(this.studentProfile.student);
  }
}
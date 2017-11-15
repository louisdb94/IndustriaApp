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
  public addClicked = false;
  public deleteClicked = false;

  experience = {};

  @Input() student: {};
  @Input() experiences: [String];

  constructor(private studentService: StudentService, private studentProfile: StudentProfile,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent){}

  save(student, exp1, exp2, exp3){

    console.log(this.deleteClicked);

    if(this.addClicked){
      this.experiences.push(this.exp1);
      this.experiences.push(this.exp2);
      this.experiences.push(this.exp3);
    }

    this.studentService.editStudent(student).subscribe(
      res => {
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );

    if(!this.deleteClicked){
      this.editMode = false;
    }

    this.deleteClicked = false;
    this.addClicked = false;
  }

  edit(){
    this.editMode = true;
  }

  deleteExperience(){
    this.deleteClicked = true;
    this.experiences.pop();
    this.experiences.pop();
    this.experiences.pop();
    this.save(this.studentProfile.student, null, null, null);
  }
}
import { Component, OnInit, Inject, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ExperienceService } from '../../services/experience.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {StudentProfile} from '../profile.component';
import { checkAndUpdateNode } from '@angular/core/src/view/view';
import { AuthService } from '../../services/auth.service';


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

  registerForm: FormGroup;
  exp1Form = new FormControl(String);
  exp2Form = new FormControl(String);
  exp3Form = new FormControl(String);
  idForm = new FormControl(String);

  experience = {};
  experiences = [];
  id: Number;
  lengthExperiences: any;

  @Input() student: {};

  constructor(  private formBuilder: FormBuilder,
                private studentService: StudentService,
                private experienceService: ExperienceService,
                private studentProfile: StudentProfile,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private auth : AuthService){}


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      exp1Form: this.exp1Form,
      exp2Form: this.exp2Form,
      exp3Form: this.exp3Form,
      idForm: this.idForm,
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getExperiencesById(this.id, null, null, null);
    });
  }

  getExperiencesById(id, exp1, exp2, exp3){
    this.experienceService.getExperienceById(id).subscribe(
      res => {this.experiences = res, this.lengthExperiences = Object.keys(res).length, this.changeExperience(exp1, exp2, exp3)}
    )
  }

  changeExperience(exp1, exp2, exp3){

    if(this.addClicked == true && exp1 != null && exp2 != null && exp3 != null){
      let i = this.lengthExperiences--;
      if(this.experiences[i]){
        this.experiences[i].function = this.exp1;
        this.experiences[i].description = this.exp2;
        this.experiences[i].period = this.exp3;
      }
    }
  }

  save(student, exp1, exp2, exp3){

    this.registerForm.value.exp1Form = exp1;
    this.registerForm.value.exp2Form = exp2;
    this.registerForm.value.exp3Form = exp3;
    this.registerForm.value.idForm = this.id;

    if(this.addClicked && exp1 != null && exp2 != null && exp3 != null){
      this.experienceService.addExperienceForm(this.registerForm.value).subscribe(
        res => {this.getExperiencesById(this.id, exp1, exp2, exp3)}
      )
    }

    this.studentService.editStudentMysql(student).subscribe(
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

    let i = this.lengthExperiences - 1;
    let experienceId = this.experiences[i].id;
    this.experienceService.deleteExperience(experienceId).subscribe(
      res => {this.getExperiencesById(this.id, null, null, null);},
      error => console.log(error)
    );
  }
}

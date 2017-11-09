import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'profile-experiences',  // <home></home>
  styleUrls: [ './profile-experiences.component.scss' ],
  templateUrl: './profile-experiences.component.html'
})
export class ExperiencesProfile {
  data: any;
  student= {};
  experiences = [];
  experiences2 = [];
  experience = {};

  exp1: String;
  exp2: String;
  exp3: String;

  public valueInput : number;
  public isUpdated = false;
  public editMode = false;

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent){}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getStudentById(id);
    });
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe(
      data => {this.student = data, this.experiences = data.experiences},
      error => console.log(error)
    );
  }

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

  edit(experiences2){
    this.editMode = true;
    this.experiences2 = this.experiences;
  }

  addExperience(exp1, exp2, exp3) {
    this.experiences.push(this.exp1);
    this.experiences.push(this.exp2);
    this.experiences.push(this.exp3);
    this.save(this.student);
  }
}
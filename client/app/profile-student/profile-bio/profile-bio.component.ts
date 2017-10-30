import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'profile-bio',  // <home></home>
  styleUrls: [ './profile-bio.component.scss' ],
  templateUrl: './profile-bio.component.html'
})
export class BioProfile {
  public editMode = false;  
  student= {};

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent) {}

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
}
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";


@Component({
  selector: 'profile-experiences',  // <home></home>
  styleUrls: [ './profile-experiences.component.scss' ],
  templateUrl: './profile-experiences.component.html'
})
export class ExperiencesProfile {
  data: any;
  student= {};
  experiences= [];
  experience= {};

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

  // deleteExperience(experience) {
  //   if (window.confirm('Are you sure you want to permanently delete this item?')) {
  //     this.studentService.deleteExperience(experience).subscribe(
  //       res => {
  //         const pos = this.experiences.map(elem => elem._id).indexOf(cat._id);
  //         this.experiences.splice(pos, 1);
  //         this.toast.setMessage('item deleted successfully.', 'success');
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }

}
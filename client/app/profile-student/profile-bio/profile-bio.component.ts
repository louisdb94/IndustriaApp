import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";

@Component({
  selector: 'profile-bio',  // <home></home>
  styleUrls: [ './profile-bio.component.scss' ],
  templateUrl: './profile-bio.component.html'
})
export class BioProfile {
  public editMode = false;
  @Input() student: {};

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent) {}

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

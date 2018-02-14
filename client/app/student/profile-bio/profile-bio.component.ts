import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'profile-bio',  // <home></home>
  styleUrls: [ './profile-bio.component.scss' ],
  templateUrl: './profile-bio.component.html'
})
export class BioProfile {
  public editMode = false;
  @Input() student: any;

  constructor(  private studentService: StudentService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                public auth : AuthService) {}

  save(student){
    this.editMode = false;

    this.studentService.editStudentMysql(student).subscribe(
      res => {
        this.student = student;
      },
      error => console.log(error)
    );
  }
}

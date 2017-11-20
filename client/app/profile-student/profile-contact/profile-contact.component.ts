import { Component, ViewChild, OnInit, enableProdMode, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'profile-contact',  // <home></home>
  styleUrls: ['./profile-contact.component.scss'],
  templateUrl: './profile-contact.component.html'
})
export class ContactProfile {

  data: any;

  @Input() student: {};
  @Input() contactChecked: {};
  editMode = false;

  constructor(  private studentService: StudentService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent){}

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

  changeChecked(e, student){
    this.contactChecked = e.target.checked;
    student.contactChecked = e.target.checked;
    this.save(student);
  }
}

import { Component, ViewChild, OnInit, enableProdMode, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService} from '../../services/contact.service';

@Component({
  selector: 'profile-contact',  // <home></home>
  styleUrls: ['./profile-contact.component.scss'],
  templateUrl: './profile-contact.component.html'
})
export class ContactProfile {

  data: any;

  @Input() student: {};
  @Input() contactChecked: {};
  @Input() contacts = [];
  editMode = false;

  constructor(  private studentService: StudentService,
                private contactService: ContactService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent){}

  save(student){
    this.editMode = false;
    this.studentService.editStudentMysql(student).subscribe(
      res => {
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  saveContact(contacts){
    this.contactService.editContact(contacts[0]).subscribe(
      res => {console.log("kakakakakkaka",res)},
      error => console.log(error)
    );

    this.editMode = false;
  }

  changeChecked(e, student){
    this.contactChecked = e.target.checked;
    student.contactChecked = e.target.checked;
    if(e.target.checked){this.contactChecked = 1; student.contactChecked = 1}
    if(!e.target.checked){this.contactChecked = 0; student.contactChecked = 0}
    this.save(student);
  }
}

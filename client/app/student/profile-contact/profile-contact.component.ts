import { Component, ViewChild, OnInit, enableProdMode, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService} from '../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { PrivacylogService } from '../../services/admin/privacylog.service';

@Component({
  selector: 'profile-contact',  // <home></home>
  styleUrls: ['./profile-contact.component.scss'],
  templateUrl: './profile-contact.component.html'
})
export class ContactProfile {

  data: any;

  @Input() student: any;
  @Input() contactChecked: any;
  @Input() contacts = [];
  editMode = false;
  privacylog = { student_fk: '', cvCheck: '', contactCheck: '', timestamp_cv: '' , timestamp_contact: ''};

  constructor(  private studentService: StudentService,
                private contactService: ContactService,
                private privacylogService: PrivacylogService,
                private activatedRoute: ActivatedRoute,
                private http: HttpClient,
                public toast: ToastComponent,
                public auth : AuthService){}

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

    this.privacylog.student_fk = student.id;
    this.privacylog.timestamp_contact = JSON.parse(JSON.stringify(new Date(Date.now())));

    if(e.target.checked){this.contactChecked = 1; student.contactChecked = 1}
    if(!e.target.checked){this.contactChecked = 0; student.contactChecked = 0}

    this.privacylog.contactCheck = student.contactChecked;
    this.privacylog.cvCheck = student.cvChecked;
    this.http.post('/api/privacylog-insert', this.privacylog).subscribe();

    this.save(student);
  }
}

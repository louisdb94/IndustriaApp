import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'profile-student',  // <home></home>
  styleUrls: [ './profile.component.scss' ],
  templateUrl: './profile.component.html'
})
export class StudentProfile implements OnInit {

  constructor(private studentService: StudentService, public auth: AuthService, public dataService: DataService, private translate: TranslateService, private activatedRoute: ActivatedRoute,
    public toast: ToastComponent) {}

  data: any;
  student: {};
  experiences = [];
  countEducation: Number;
  countExperiences: Number;
  contactChecked: boolean;

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  ngOnInit() {

    // if (this.auth.loggedIn && this.dataService.idMessage  == this.compareID) {
    //   this.studentService.getStudentByRnumber(this.auth.currentUser.rnumber).subscribe(
    //     data => (this.data.changeMessageId(data._id), this.data.changeMessageNav(true)),
    //     error => console.log("error")
    //   );
    // }

    this.translate.setDefaultLang('en');
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getStudentByIdMySql(id);
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getStudentByIdMySql(id) {
    this.studentService.getStudentByIdMysql(id).subscribe(
      data => {this.student = data[0], this.countEducation = data[0].countEducation, this.countExperiences = data[0].countExperiences, this.contactChecked = data[0].contactChecked},
      error => console.log(error),
    );
  }
}

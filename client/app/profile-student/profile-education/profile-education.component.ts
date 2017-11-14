import { Component, OnInit, Input } from '@angular/core';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDateTimeInput';
import { StudentService } from '../../services/student.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
  selector: 'profile-education',  // <home></home>
  styleUrls: [ './profile-education.component.scss' ],
  templateUrl: './profile-education.component.html'
})
export class EducationProfile {

  public editMode = false;
  data: any;
  @Input() student: {};

  public title1 = 'Good education.';
  public title2 = 'Good education.';
  public title3 = 'Good education.';
  public title4 = 'Good education.';
  public title5 = 'Good education.';
  public title6 = 'Good education.';

  public edu1 = 'Good education.';
  public edu2 = 'Good education.';
  public edu3 = 'Good education.';
  public edu4 = 'Good education.';
  public edu5 = 'Good education.';
  public edu6 = 'Good education.';

  public date1 = '2014-2017';
  public date2 = '2014-2017';
  public date3From = '2015 June';
  public date3Untill = '2017 October';
  public dateFrom = '2015 June';
  public dateUntill = '2017 October';
  public date4 = '2014-2017';
  public date5 = '2014-2017';
  public date6 = '2014-2017';

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent){}

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

  add(student){
    if(student.countEducation < 7){
      student.countEducation++;
    }
  }

  delete(student){
    if(student.countEducation > 0){
      student.countEducation--;
    }
  }
    
}
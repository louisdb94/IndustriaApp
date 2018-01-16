import { Component, ViewChild, OnInit, Input } from '@angular/core';
// import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
// import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
// import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { StudentService } from '../../services/student.service';
import { ProfessionalService } from '../../services/professional.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'profile-professional',  // <home></home>
  styleUrls: ['./profile-professional.component.scss'],
  templateUrl: './profile-professional.component.html'
})
export class ProfessionalProfile {

  // @ViewChild('jqxProgressBar1') progressBar1: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList1') dropDownList1: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar2') progressBar2: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList2') dropDownList2: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar3') progressBar3: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList3') dropDownList3: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar4') progressBar4: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList4') dropDownList4: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar5') progressBar5: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList5') dropDownList5: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar6') progressBar6: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList6') dropDownList6: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar7') progressBar7: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList7') dropDownList7: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar8') progressBar8: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList8') dropDownList8: jqxDropDownListComponent;
  // @ViewChild('jqxProgressBar9') progressBar9: jqxProgressBarComponent;
  // @ViewChild('jqxDropDownList9') dropDownList9: jqxDropDownListComponent;

  public editMode = false;

  data: any;
  @Input() student: any;
  @Input() professional = [];


  public skill1 = 'Java';
  public skill2 = 'Java';
  public skill3 = 'Java';
  public skill4 = 'Java';
  public skill5 = 'Java';
  public skill6 = 'Java';
  public skill7 = 'Java';
  public skill8 = 'Java';
  public skill9 = 'Java';

  source: string[] = ['Learning', 'Basic', 'Intermediate', 'Expert'];

  public valueInput: number;
  public isUpdated = false;


  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private professionalService: ProfessionalService,
    public toast: ToastComponent,
    public auth: AuthService) { }


  save(student, professional) {
    this.editMode = false;


    let count = student.countProfessional;

    for (let i = 0; i <= count; i++) {
      console.log(this.professional[i]);
      if (this.professional[i]) {
        this.professionalService.editProfessional(this.professional[i]).subscribe(
          res => { console.log("kakakakakkaka", res) },
          error => console.log(error)
        );
      }
    }
    this.studentService.editStudentMysql(student).subscribe(
      res => {
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  add(student) {
    if (student.countProfessional < 5) {
      student.countProfessional++;
      console.log(student.countProfessional);
    }
  }

  delete(student) {
    if (student.countProfessional > 0) {
      student.countProfessional--;
    }
  }

  updateProgressBar(event: any, x: number, professional): void {
    let args = event.args;
    // review Tom removed progressbar
    // let item = this.dropDownList1.getItem(args.index);
    let item = null;
    if (x == 1) {
      if (item != null) {
        if (item.label == this.source[0]) {
          professional[0].value = 25;
          professional[0].value_type = this.source[0];
          this.isUpdated = true;
        }
        if (item.label == this.source[1]) {
          professional[0].value = 50;
          professional[0].value_type = this.source[1];
          this.isUpdated = true;
        }
        if (item.label == this.source[2]) {
          professional[0].value = 75;
          professional[0].value_type = this.source[2];
          this.isUpdated = true;
        }
        if (item.label == this.source[3]) {
          professional[0].value = 100;
          professional[0].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if (x == 2) {
      if (item != null) {
        if (item.label == this.source[0]) {
          professional[1].value = 25;
          professional[1].value_type = this.source[0];
          this.isUpdated = true;
        }
        if (item.label == this.source[1]) {
          professional[1].value = 50;
          professional[1].value_type = this.source[1];
          this.isUpdated = true;
        }
        if (item.label == this.source[2]) {
          professional[1].value = 75;
          professional[1].value_type = this.source[2];
          this.isUpdated = true;
        }
        if (item.label == this.source[3]) {
          professional[1].value = 100;
          professional[1].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if (x == 3) {
      if (item != null) {
        if (item.label == this.source[0]) {
          professional[2].value = 25;
          professional[2].value_type = this.source[0];
          this.isUpdated = true;
        }
        if (item.label == this.source[1]) {
          professional[2].value = 50;
          professional[2].value_type = this.source[1];
          this.isUpdated = true;
        }
        if (item.label == this.source[2]) {
          professional[2].value = 75;
          professional[2].value_type = this.source[2];
          this.isUpdated = true;
        }
        if (item.label == this.source[3]) {
          professional[2].value = 100;
          professional[2].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }
    if (x == 4) {
      if (item != null) {
        if (item.label == this.source[0]) {
          professional[3].value = 25;
          professional[3].value_type = this.source[0];
          this.isUpdated = true;
        }
        if (item.label == this.source[1]) {
          professional[3].value = 50;
          professional[3].value_type = this.source[1];
          this.isUpdated = true;
        }
        if (item.label == this.source[2]) {
          professional[3].value = 75;
          professional[3].value_type = this.source[2];
          this.isUpdated = true;
        }
        if (item.label == this.source[3]) {
          professional[3].value = 100;
          professional[3].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if (x == 5) {
      if (item != null) {
        if (item.label == this.source[0]) {
          professional[4].value = 25;
          professional[4].value_type = this.source[0];
          this.isUpdated = true;
        }
        if (item.label == this.source[1]) {
          professional[4].value = 50;
          professional[4].value_type = this.source[1];
          this.isUpdated = true;
        }
        if (item.label == this.source[2]) {
          professional[4].value = 75;
          professional[4].value_type = this.source[2];
          this.isUpdated = true;
        }
        if (item.label == this.source[3]) {
          professional[4].value = 100;
          professional[4].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if (x == 6) {
      if (item != null) {
        if (item.label == this.source[0]) {
          professional[5].value = 25;
          professional[5].value_type = this.source[0];
          this.isUpdated = true;
        }
        if (item.label == this.source[1]) {
          professional[5].value = 50;
          professional[5].value_type = this.source[1];
          this.isUpdated = true;
        }
        if (item.label == this.source[2]) {
          professional[5].value = 75;
          professional[5].value_type = this.source[2];
          this.isUpdated = true;
        }
        if (item.label == this.source[3]) {
          professional[5].value = 100;
          professional[5].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }
  }
}

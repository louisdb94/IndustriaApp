import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { StudentService } from '../../services/student.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
  selector: 'profile-skills',  // <home></home>
  styleUrls: [ './profile-skills.component.scss' ],
  templateUrl: './profile-skills.component.html'
})
export class SkillsProfile {

  @ViewChild('jqxProgressBar1') progressBar1: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList1') dropDownList1: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar2') progressBar2: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList2') dropDownList2: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar3') progressBar3: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList3') dropDownList3: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar4') progressBar4: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList4') dropDownList4: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar5') progressBar5: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList5') dropDownList5: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar6') progressBar6: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList6') dropDownList6: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar7') progressBar7: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList7') dropDownList7: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar8') progressBar8: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList8') dropDownList8: jqxDropDownListComponent;
  @ViewChild('jqxProgressBar9') progressBar9: jqxProgressBarComponent;
  @ViewChild('jqxDropDownList9') dropDownList9: jqxDropDownListComponent;

  public editMode = false;

  data: any;
  @Input() student: {};

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

  public valueInput : number;
  public isUpdated = false;

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
    if(student.countExperiences < 6){
      student.countExperiences++;
    }
  }

  delete(student){
    if(student.countExperiences > 0){
      student.countExperiences--;
    }
  }

  updateProgressBar(event: any, x: number, student): void {
    let args = event.args;
    let item = this.dropDownList1.getItem(args.index);

    if(x == 1){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[0] = 25;
          student.skillsValue[1] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[0] = 50;
          student.skillsValue[1] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[0] = 75;
          student.skillsValue[1] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[0] = 100;
          student.skillsValue[1] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 2){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[2] = 25;
          student.skillsValue[3] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[2] = 50;
          student.skillsValue[3] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[2] = 75;
          student.skillsValue[3] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[2] = 100;
          student.skillsValue[3] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 3){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[4] = 25;
          student.skillsValue[5] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[4] = 50;
          student.skillsValue[5] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[4] = 75;
          student.skillsValue[5] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[4] = 100;
          student.skillsValue[5] = this.source[3];
          this.isUpdated = true;
        }
      }
    }
    if(x == 4){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[6] = 25;
          student.skillsValue[7] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[6] = 50;
          student.skillsValue[7] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[6] = 75;
          student.skillsValue[7] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[6] = 100;
          student.skillsValue[7] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 5){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[8] = 25;
          student.skillsValue[9] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[8] = 50;
          student.skillsValue[9] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[8] = 75;
          student.skillsValue[9] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[8] = 100;
          student.skillsValue[9] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 6){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[10] = 25;
          student.skillsValue[11] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[10] = 50;
          student.skillsValue[11] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[10] = 75;
          student.skillsValue[11] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[10] = 100;
          student.skillsValue[11] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 7){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[12] = 25;
          student.skillsValue[13] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[12] = 50;
          student.skillsValue[13] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[12] = 75;
          student.skillsValue[13] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[12] = 100;
          student.skillsValue[13] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 8){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[14] = 25;
          student.skillsValue[15] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[14] = 50;
          student.skillsValue[15] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[14] = 75;
          student.skillsValue[15] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[14] = 100;
          student.skillsValue[15] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 9){
      if (item != null) {
        if(item.label == this.source[0]){
          student.skillsValue[16] = 25;
          student.skillsValue[17] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.skillsValue[16] = 50;
          student.skillsValue[17] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.skillsValue[16] = 75;
          student.skillsValue[17] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.skillsValue[16] = 100;
          student.skillsValue[17] = this.source[3];
          this.isUpdated = true;
        }
      }
    } 
  }    
}
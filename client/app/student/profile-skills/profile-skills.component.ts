import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { StudentService } from '../../services/student.service';
import { SkillService} from '../../services/skill.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';


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
  @Input() skills = [];


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


  constructor(  private studentService: StudentService,
                private skillService : SkillService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private auth : AuthService){}


  save(student, skills){
    this.editMode = false;


    let count = student.countSkills;

        for(let i = 0; i <= count; i++){
          console.log(this.skills[i]);
          if(this.skills[i]){
            this.skillService.editSkill(this.skills[i]).subscribe(
              res => {console.log("kakakakakkaka",res)},
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

  add(student){
    if(student.countSkills < 6){
      student.countSkills++;
    }
  }

  delete(student){
    if(student.countSkills > 0){
      student.countSkills--;
    }
  }

  updateProgressBar(event: any, x: number, skills): void {
    let args = event.args;
    let item = this.dropDownList1.getItem(args.index);

    if(x == 1){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[0].value = 25;
          skills[0].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[0].value = 50;
          skills[0].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[0].value = 75;
          skills[0].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[0].value = 100;
          skills[0].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 2){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[1].value = 25;
          skills[1].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[1].value = 50;
          skills[1].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[1].value = 75;
          skills[1].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[1].value = 100;
          skills[1].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 3){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[2].value = 25;
          skills[2].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[2].value = 50;
          skills[2].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[2].value = 75;
          skills[2].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[2].value = 100;
          skills[2].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }
    if(x == 4){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[3].value = 25;
          skills[3].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[3].value = 50;
          skills[3].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[3].value = 75;
          skills[3].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[3].value = 100;
          skills[3].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 5){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[4].value = 25;
          skills[4].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[4].value = 50;
          skills[4].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[4].value = 75;
          skills[4].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[4].value = 100;
          skills[4].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 6){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[5].value = 25;
          skills[5].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[5].value = 50;
          skills[5].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[5].value = 75;
          skills[5].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[5].value = 100;
          skills[5].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 7){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[6].value = 25;
          skills[6].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[6].value = 50;
          skills[6].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[6].value = 75;
          skills[6].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[6].value = 100;
          skills[6].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 8){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[7].value = 25;
          skills[7].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[7].value = 50;
          skills[7].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[7].value = 75;
          skills[7].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[7].value = 100;
          skills[7].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 9){
      if (item != null) {
        if(item.label == this.source[0]){
          skills[8].value = 25;
          skills[8].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          skills[8].value = 50;
          skills[8].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          skills[8].value = 75;
          skills[8].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          skills[8].value = 100;
          skills[8].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }
  }
}

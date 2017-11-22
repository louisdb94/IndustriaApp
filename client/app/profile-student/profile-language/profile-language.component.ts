import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { StudentService } from '../../services/student.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
  selector: 'profile-language',  // <home></home>
  styleUrls: [ './profile-language.component.scss' ],
  templateUrl: './profile-language.component.html'
})
export class LanguageProfile {

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

  public editMode = false;

  data: any;
  @Input() student: {};

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
      },
      error => console.log(error)
    );
  }

  add(student){
    if(student.countLanguage < 4){
      student.countLanguage++;
    }

    if(student.countLanguage < 4){
      console.log("toast");
      this.toast.setMessage('Format is r0123456@kuleuven.be', 'info');
    }
  }

  delete(student){
    if(student.countLanguage > 0){
      student.countLanguage--;
    }
  }

  updateProgressBar(event: any, x: number, student): void {
    let args = event.args;
    let item = this.dropDownList1.getItem(args.index);

    if(x == 1){
      if (item != null) {
        if(item.label == this.source[0]){
          student.languageValue[0] = 25;
          student.languageValue[1] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.languageValue[0] = 50;
          student.languageValue[1] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.languageValue[0] = 75;
          student.languageValue[1] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.languageValue[0] = 100;
          student.languageValue[1] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 2){
      if (item != null) {
        if(item.label == this.source[0]){
          student.languageValue[2] = 25;
          student.languageValue[3] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.languageValue[2] = 50;
          student.languageValue[3] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.languageValue[2] = 75;
          student.languageValue[3] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.languageValue[2] = 100;
          student.languageValue[3] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 3){
      if (item != null) {
        if(item.label == this.source[0]){
          student.languageValue[4] = 25;
          student.languageValue[5] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.languageValue[4] = 50;
          student.languageValue[5] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.languageValue[4] = 75;
          student.languageValue[5] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.languageValue[4] = 100;
          student.languageValue[5] = this.source[3];
          this.isUpdated = true;
        }
      }
    }
    if(x == 4){
      if (item != null) {
        if(item.label == this.source[0]){
          student.languageValue[6] = 25;
          student.languageValue[7] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.languageValue[6] = 50;
          student.languageValue[7] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.languageValue[6] = 75;
          student.languageValue[7] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.languageValue[6] = 100;
          student.languageValue[7] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 5){
      if (item != null) {
        if(item.label == this.source[0]){
          student.languageValue[8] = 25;
          student.languageValue[9] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.languageValue[8] = 50;
          student.languageValue[9] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.languageValue[8] = 75;
          student.languageValue[9] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.languageValue[8] = 100;
          student.languageValue[9] = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 6){
      if (item != null) {
        if(item.label == this.source[0]){
          student.languageValue[10] = 25;
          student.languageValue[11] = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          student.languageValue[10] = 50;
          student.languageValue[11] = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          student.languageValue[10] = 75;
          student.languageValue[11] = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          student.languageValue[10] = 100;
          student.languageValue[11] = this.source[3];
          this.isUpdated = true;
        }
      }
    } 
  }    
}
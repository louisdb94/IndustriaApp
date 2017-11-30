import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
import { StudentService } from '../../services/student.service';
import { LanguageService} from '../../services/language.service';
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
  @Input() languages = [];

  source: string[] = ['Learning', 'Basic', 'Intermediate', 'Expert'];

  public valueInput : number;
  public isUpdated = false;

  constructor(  private studentService: StudentService,
                private languageService: LanguageService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent){}

  save(student, languages){
    this.editMode = false;

    let count = student.countLanguage;
    for(let i = 0; i <= count; i++){
      if(this.languages[i]){
        this.languageService.editLanguage(this.languages[i]).subscribe(
          res => {},
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
    if(student.countLanguage < 4){
      student.countLanguage++;
    }
  }

  delete(student){
    if(student.countLanguage > 0){
      student.countLanguage--;
    }
  }

  updateProgressBar(event: any, x: number, languages): void {
    let args = event.args;
    let item = this.dropDownList1.getItem(args.index);

    if(x == 1){
      if (item != null) {
        if(item.label == this.source[0]){
          languages[0].value = 25;
          languages[0].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          languages[0].value = 50;
          languages[0].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          languages[0].value = 75;
          languages[0].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          languages[0].value = 100;
          languages[0].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 2){
      if (item != null) {
        if(item.label == this.source[0]){
          languages[1].value = 25;
          languages[1].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          languages[1].value = 50;
          languages[1].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          languages[1].value = 75;
          languages[1].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          languages[1].value = 100;
          languages[1].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 3){
      if (item != null) {
        if(item.label == this.source[0]){
          languages[2].value = 25;
          languages[2].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          languages[2].value = 50;
          languages[2].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          languages[2].value = 75;
          languages[2].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          languages[2].value = 100;
          languages[2].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }
    if(x == 4){
      if (item != null) {
        if(item.label == this.source[0]){
          languages[3].value = 25;
          languages[3].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          languages[3].value = 50;
          languages[3].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          languages[3].value = 75;
          languages[3].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          languages[3].value = 100;
          languages[3].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 5){
      if (item != null) {
        if(item.label == this.source[0]){
          languages[4].value = 25;
          languages[4].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          languages[4].value = 50;
          languages[4].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          languages[4].value = 75;
          languages[4].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          languages[4].value = 100;
          languages[4].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }

    if(x == 6){
      if (item != null) {
        if(item.label == this.source[0]){
          languages[5].value = 25;
          languages[5].value_type = this.source[0];
          this.isUpdated = true;
        }
        if(item.label == this.source[1]){
          languages[5].value = 50;
          languages[5].value_type = this.source[1];
          this.isUpdated = true;
        }
        if(item.label == this.source[2]){
          languages[5].value = 75;
          languages[5].value_type = this.source[2];
          this.isUpdated = true;
        }
        if(item.label == this.source[3]){
          languages[5].value = 100;
          languages[5].value_type = this.source[3];
          this.isUpdated = true;
        }
      }
    }
  }
}

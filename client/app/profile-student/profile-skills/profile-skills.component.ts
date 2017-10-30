import { Component,ViewChild, OnInit } from '@angular/core';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';




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
  public count = 0;

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

  save(){
    this.editMode = false;
  }

  add(){
    this.count++;
  }

  updateProgressBar(event: any, x: number): void {
    let args = event.args;
    let item = this.dropDownList1.getItem(args.index);

    if(x == 1){
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar1.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar1.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar1.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar1.val(100);
          this.isUpdated = true;
        }
      }
    }

    if (x == 2){
      item = this.dropDownList2.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar2.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar2.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar2.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar2.val(100);
          this.isUpdated = true;
        }
      }
    }
    if (x == 3){
      item = this.dropDownList3.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar3.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar3.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar3.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar3.val(100);
          this.isUpdated = true;
        }
      }
    }
    if (x == 4){
      item = this.dropDownList4.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar4.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar4.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar4.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar4.val(100);
          this.isUpdated = true;
        }
      }
    }
    if (x == 5){
      item = this.dropDownList5.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar5.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar5.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar5.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar5.val(100);
          this.isUpdated = true;
        }
      }
    }
    if (x == 6){
      item = this.dropDownList6.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar6.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar6.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar6.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar6.val(100);
          this.isUpdated = true;
        }
      }
    }

    if (x == 7){
      item = this.dropDownList7.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar7.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar7.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar7.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar7.val(100);
          this.isUpdated = true;
        }
      }
    }

    if (x == 8){
      item = this.dropDownList8.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar8.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar8.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar8.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar8.val(100);
          this.isUpdated = true;
        }
      }
    }

    if (x == 9){
      item = this.dropDownList9.getItem(args.index);
      if (item != null) {
        if(item.label == 'Learning'){
          this.progressBar9.val(25);
          this.isUpdated = true;
        }
        if(item.label == 'Basic'){
          this.progressBar9.val(50);
          this.isUpdated = true;
        }
        if(item.label == 'Intermediate'){
          this.progressBar9.val(75);
          this.isUpdated = true;
        }
        if(item.label == 'Expert'){
          this.progressBar9.val(100);
          this.isUpdated = true;
        }
      }
    }
  } 
    
}
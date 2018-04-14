import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { LanguageService} from '../../services/language.service';
import { DataService } from '../../services/data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import language from '../../../../server/models_mysql/students/language';


@Component({
  selector: 'profile-language',
  styleUrls: [ './profile-language.component.scss' ],
  templateUrl: './profile-language.component.html'
})
export class LanguageProfile {

  public editMode = false;
  public valueInput: number;
  public isUpdated = false;

  data: any;
  @Input() student: any;
  @Input() languages = [];

  filters = ['Learning', 'Basic', 'Intermediate', 'Expert'];
  model = {
    filter: this.filters[0]
  };

  registerForm: FormGroup;
  type = new FormControl(String);
  value = new FormControl(String);
  value_type = new FormControl(String);
  student_fk = new FormControl(String);

  constructor(  private studentService: StudentService,
                private languageService: LanguageService,
                public dataService: DataService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private http: HttpClient,
                private formBuilder: FormBuilder,
                public auth : AuthService){}


  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      type: this.type,
      value: this.value,
      value_type: this.value_type,
      student_fk: this.student_fk,
    });
  }


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
            },
      error => console.log(error)
    );
  }

  add(student){
    if (student.countLanguage < 5) {
      this.registerForm.value.type = 'Nederlands';
      this.registerForm.value.value = 100;
      this.registerForm.value.value_type = 'Expert';
      this.registerForm.value.student_fk = student.id;
      this.languageService.addLanguageFromStudentId(this.registerForm.value).subscribe(
        res => {this.getLanguages(student.id)},
        error => {console.log("error")}
      );
      student.countLanguage++;
    }
  }

  getLanguages(id){
    this.languageService.getLanguageByStudentId(id).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.languages = data;
      }
    )
  }

  delete(student, languages){
    if (student.countLanguage > 0) {
      let id = languages[languages.length - 1].id;
      student.countLanguage--;
      this.languages.splice(languages.length - 1, 1);
      this.languageService.deleteLanguage(id).subscribe(
        res => {this.save(student, languages)}
      );
        }
  }

  onChange(languages){
    if (languages.value_type == this.filters[0]) {
      languages.value = 25;
      languages.value_type = this.filters[0];
      this.isUpdated = true;
    }
    if (languages.value_type == this.filters[1]) {
      languages.value = 50;
      languages.value_type = this.filters[1];
      this.isUpdated = true;
    }
    if (languages.value_type == this.filters[2]) {
      languages.value = 75;
      languages.value_type = this.filters[2];
      this.isUpdated = true;
    }
    if (languages.value_type == this.filters[3]) {
      languages.value = 100;
      languages.value_type = this.filters[3];
      this.isUpdated = true;
    }
  }
}

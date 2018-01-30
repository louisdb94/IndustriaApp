import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { LanguageService} from '../../services/language.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(  private studentService: StudentService,
                private languageService: LanguageService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private http: HttpClient,
                public auth : AuthService){}


  save(student, languages){
    this.editMode = false;

    let count = student.countLanguage;
    for(let i = 0; i < this.languages.length; i++){
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
    if (student.countLanguage <= 5) {
      this.http.get(`/api/language-insert/${student.id}`).subscribe(
        res => {this.getLanguages(student.id)},
        error => {console.log("error")}
      );
      // let add_language = {id: '', student_fk: '', value: '50', value_type: 'Intermediate'};
      // this.languages.push(add_language);
      student.countLanguage++;
    }
  }

  getLanguages(id){
    this.languageService.getLanguageByStudentId(id).subscribe(
      res => {this.languages = res}
    )
  }

  delete(student, languages){
    if (student.countLanguage > 0) {
      let id = languages[languages.length - 1].id;
      student.countLanguage--;
      this.languages.splice(languages.length - 1, 1);
      this.http.get(`/api/language-delete/${id}`).subscribe(
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

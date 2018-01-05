import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {SkillService} from '../../services/skill.service';
import {ProfessionalService} from '../../services/professional.service';
import {LanguageService} from '../../services/language.service';
import {CvsService} from '../../services/cvs.service';
import {OrderListModule} from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import {AccordionModule} from 'primeng/primeng';

import { Subject } from 'rxjs/Subject';

import {FilterPipe} from '../../pipes/student-list.pipe';
import {FilterSkill} from '../../pipes/filterSkill.pipe';
import { FilterProfessional} from '../../pipes/filterProfessional.pipe';
import { FilterLanguage} from '../../pipes/filterLanguage.pipe';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [FilterPipe, FilterSkill, FilterProfessional, FilterLanguage]

})
export class StudentListComponent implements OnInit {

  constructor(  private studentService: StudentService,
                private skillService : SkillService,
                private languageService: LanguageService,
                private professionalService : ProfessionalService,
                private cvsService : CvsService,
                private http : HttpClient) { }

  students = [];
  ids = [];
  skills = [];
  proffskills =[];
  languages = [];
  studentjes : any;

  filters = ['Name', 'Degree'];
  model = {
    filter: this.filters[0]
  };


  ngOnInit() {
    this.getStudents();
    this.getStudentsIds();
    this.getSkills();
    this.getLanguages();
    this.getProffskills();

  }

  //Get all students -> add to students[]
  getStudents(){
    this.studentService.getStudentsMysql().subscribe(
      data => {this.students = data, console.log(this.students)},
      error => console.log(error)
    )
  }
  //Get all the ids of the students -> add to ids[]
  getStudentsIds(){
    this.studentService.getStudentsIdsMysql().subscribe(
      data => {this.ids = data},
      error => console.log(error)
    )
  }
  //get all distinct skills of all students -> add to skills[]
  //sort them alphabetically
  getSkills(){
    this.skillService.getSkillsDistinct().subscribe(
      data => {this.skills = data, this.sort(this.skills)},
      error => console.log(error)
    )
  }
  //get all disctinct professional skills of all students -> add to proffskills[]
  getProffskills(){
    this.professionalService.getProfessionalDistinct().subscribe(
      data => {this.proffskills = data, this.sort(this.proffskills)},
      error => console.log(error)
    )
  }
  //get all distinct languages -> add them to languages[]
  getLanguages(){
    this.languageService.getLanguagesDistinct().subscribe(
      data => {this.languages = data, this.sortLang(this.languages)},
      error => console.log(error)
    )
  }

  //sort array on skills alphabetically
  sort(array){
    array.sort( function(name1, name2) {
      if ( name1.skill < name2.skill ){
        return -1;
      }else if( name1.skill > name2.skill ){
          return 1;
      }else{
        return 0;
      }
   });
  }
  //sort array on language type alphabetically
  sortLang(array){
    array.sort( function(name1, name2) {
      if ( name1.type < name2.type ){
        return -1;
      }else if( name1.type > name2.type ){
          return 1;
      }else{
        return 0;
      }
   });
  }



  //order by gradYear in searchBox when clicking on 'GradYear'
  clickGrad = 0;
  sortGradYear(){
      if(this.clickGrad == 0){
        this.students.sort( function(name1, name2) {
          if ( name1.gradYear < name2.gradYear ){
            return -1;
          }else if( name1.gradYear > name2.gradYear ){
              return 1;
          }else{
            return 0;
          }
        });
      this.clickGrad = 1;
      }
    else{
      this.students.sort( function(name1, name2) {
        if ( name1.gradYear > name2.gradYear ){
          return -1;
        }else if( name1.gradYear < name2.gradYear ){
            return 1;
        }else{
          return 0;
        }
      });
      this.clickGrad = 0;
    }
  }
  //order by Name in searchBox when clicking on 'Name'
  clickName = 0;
  sortName(){
    if(this.clickName == 0){
      this.students.sort( function(name1, name2) {
        if ( name1.name < name2.name ){
          return -1;
        }else if( name1.name > name2.name ){
            return 1;
        }else{
          return 0;
        }
      });
    this.clickName = 1;
    }
    else{
      this.students.sort( function(name1, name2) {
        if ( name1.name > name2.name ){
          return -1;
        }else if( name1.name < name2.name ){
            return 1;
        }else{
          return 0;
        }
      });
      this.clickName = 0;
    }
  }

  //order by Name in searchBox when clicking on 'Name'
  clickDegree = 0;
  sortDegree(){
    if(this.clickDegree == 0){
      this.students.sort( function(name1, name2) {
        if ( name1.degree < name2.degree ){
          return -1;
        }else if( name1.degree > name2.degree ){
            return 1;
        }else{
          return 0;
        }
      });
    this.clickDegree = 1;
    }
    else{
      this.students.sort( function(name1, name2) {
        if ( name1.degree > name2.degree ){
          return -1;
        }else if( name1.degree < name2.degree ){
            return 1;
        }else{
          return 0;
        }
      });
      this.clickDegree = 0;
    }
  }


  //keep track of what a person checks -> by checking a skill, the student_fk
  //  is stored inside skillFk[]
  // checkedSkill keeps track of how many skills there are checked
  skillFk = [];
  skillsChecked = [];
  checkedSkill = 0;
  inputSkillCheck(e, skill){
    if(e.target.checked){
      this.checkedSkill ++;
      this.skillsChecked[this.skillsChecked.length] = skill;
      if(skill != ""){
      this.skillService.getFkbySkill(skill).subscribe(
          data => { for(let i = 0; i< data.length; i++){
                        this.skillFk.push(data[i]);
                    }
                    this.checkSkillDupes(this.checkedSkill);},
          error => console.log(error)
        )
      }
    }
    else{
        this.checkedSkill --;
        for(let i = 0; i< this.skillsChecked.length; i++){
          if(this.skillsChecked[i] == skill){
            this.skillsChecked.splice(i,1);

          }
        }

        for(let i = 0; i<  this.skillFk.length;i++){
          if(this.skillFk[i].skill.toLowerCase() == skill.toLowerCase()){
            this.skillFk.splice(i,1);
            i--;
          }
        }
        this.checkSkillDupes(this.checkedSkill);
    }
  }

  //this method gives the student_fk of the student with those skills (skills
  //   that are checked) -> these students are stored in nieuwelijstSkillsFk[]
  nieuwelijstSkillsFk = [];
  checkSkillDupes(checked){
      this.nieuwelijstSkillsFk = [];
      if(checked > 1){

          let number = 0;

        for (let i = 0; i < this.skillFk.length; i++)
        {
          let random = this.skillFk[i];
          for (let j = 0; j < this.skillFk.length; j++){
            if(this.skillFk[j].student_fk == random.student_fk){
              number++;
            }
            if(number == checked){
              if(this.nieuwelijstSkillsFk.length == 0){
                this.nieuwelijstSkillsFk.push(random);

              }
              for(let k=0;j<this.nieuwelijstSkillsFk.length;k++){
                if(this.nieuwelijstSkillsFk[k] == random.student_fk){
                  break;
                }
                else{
                  this.nieuwelijstSkillsFk.push(random);
                }
              }
            }
            if(j == (this.skillFk.length -1)){
              number =0 ;
            }
          }
        }
    }else{
      this.nieuwelijstSkillsFk = this.skillFk;
    }
  }

  //keep track of what a person checks -> by checking a skill, the student_fk
  //  is stored inside profskillFk[]
  // checkedProf keeps track of how many skills there are checked
  profskillFk = [];
  profSkillsChecked = [];
  checkedProf = 0;
  inputProfskillCheck(e, skill){
    if(e.target.checked){
      this.checkedProf ++;
      this.profSkillsChecked[this.profSkillsChecked.length] = skill;
      if(skill != ""){
      this.professionalService.getFkbySkill(skill).subscribe(
          data => { for(let i = 0; i< data.length; i++){
                        this.profskillFk.push(data[i]);
                    }
                    this.checkProfDupes(this.checkedProf);},
          error => console.log(error)
        )
      }
    }
    else{
        this.checkedProf --;
        for(let i = 0; i< this.profSkillsChecked.length; i++){
          if(this.profSkillsChecked[i] == skill){
            this.profSkillsChecked.splice(i,1);

          }
        }

        for(let i = 0; i<  this.profskillFk.length;i++){
          if(this.profskillFk[i].skill.toLowerCase() == skill.toLowerCase()){
            this.profskillFk.splice(i,1);
            i--;
          }
        }
        this.checkProfDupes(this.checkedProf);
    }
  }

  //this method gives the student_fk of the student with those profskills (skills
  //   that are checked) -> these students are stored in nieuwelijstProfskillsFk[]
  nieuwelijstProfskillsFk = [];
  checkProfDupes(checked){
      this.nieuwelijstProfskillsFk = [];
      if(checked > 1){

          let number = 0;

        for (let i = 0; i < this.profskillFk.length; i++)
        {
          let random = this.profskillFk[i];
          for (let j = 0; j < this.profskillFk.length; j++){
            if(this.profskillFk[j].student_fk == random.student_fk){
              number++;
            }
            if(number == checked){
              if(this.nieuwelijstProfskillsFk.length == 0){
                this.nieuwelijstProfskillsFk.push(random);

              }
              for(let k=0;j<this.nieuwelijstProfskillsFk.length;k++){
                if(this.nieuwelijstProfskillsFk[k] == random.student_fk){
                  break;
                }
                else{
                  this.nieuwelijstProfskillsFk.push(random);
                }
              }
            }
            if(j == (this.profskillFk.length -1)){
              number =0 ;
            }
          }
        }
    }else{
      this.nieuwelijstProfskillsFk = this.profskillFk;
    }
  }

  //keep track of what a person checks -> by checking a language, the student_fk
  //  is stored inside languageFk[]
  // checkedLang keeps track of how many skills there are checked
  languageFk = [];
  languageChecked = [];
  checkedLang = 0;
  inputLangugageCheck(e, type){
    if(e.target.checked){
      this.checkedLang ++;
      this.languageChecked[this.languageChecked.length] = type;
      if(type != ""){
      this.languageService.getFkbyLang(type).subscribe(
          data => { for(let i = 0; i< data.length; i++){
                        this.languageFk.push(data[i]);
                    }
                    this.checkLangDupes(this.checkedLang);},
          error => console.log(error)
        )
      }
    }
    else{
        this.checkedLang --;
        for(let i = 0; i< this.languageChecked.length; i++){
          if(this.languageChecked[i] == type){
            this.languageChecked.splice(i,1);

          }
        }

        for(let i = 0; i<  this.languageFk.length;i++){
          if(this.languageFk[i].type.toLowerCase() == type.toLowerCase()){
            this.languageFk.splice(i,1);
            i--;
          }
        }
        this.checkLangDupes(this.checkedLang);
    }
  }

  //this method gives the student_fk of the student with those language (langs
  //   that are checked) -> these students are stored in nieuwelijstLangFk[]
  nieuwelijstLangFk = [];
  checkLangDupes(checked){
      this.nieuwelijstLangFk = [];
      if(checked > 1){

          let number = 0;

        for (let i = 0; i < this.languageFk.length; i++)
        {
          let random = this.languageFk[i];
          for (let j = 0; j < this.languageFk.length; j++){
            if(this.languageFk[j].student_fk == random.student_fk){
              number++;
            }
            if(number == checked){
              if(this.nieuwelijstLangFk.length == 0){
                this.nieuwelijstLangFk.push(random);

              }
              for(let k=0;j<this.nieuwelijstLangFk.length;k++){
                if(this.nieuwelijstLangFk[k] == random.student_fk){
                  break;
                }
                else{
                  this.nieuwelijstLangFk.push(random);
                }
              }
            }
            if(j == (this.languageFk.length -1)){
              number =0 ;
            }
          }
        }
    }else{
      this.nieuwelijstLangFk = this.languageFk;
    }

  }

  //This method gives all the students back with the checked conditions.
  advancedSearch(){

    //ADVANCED SEARCH
    console.log(this.nieuwelijstLangFk, this.nieuwelijstSkillsFk, this.nieuwelijstProfskillsFk)

    if(this.nieuwelijstLangFk.length > 0 && this.nieuwelijstSkillsFk.length == 0 && this.nieuwelijstProfskillsFk.length == 0 ){
      this.students = [];
      for(let i = 0; i < this.nieuwelijstLangFk.length; i++){
        this.studentService.getStudentByIdMysql(this.nieuwelijstLangFk[i].student_fk).subscribe(
          data => {this.students[i] = data[0]},
          error => console.log(error)
        )

      }
    }
    else if(this.nieuwelijstSkillsFk.length > 0 && this.nieuwelijstLangFk.length == 0 && this.nieuwelijstProfskillsFk.length == 0){
      this.students = [];
      for(let i = 0; i < this.nieuwelijstSkillsFk.length; i++){
        this.studentService.getStudentByIdMysql(this.nieuwelijstSkillsFk[i].student_fk).subscribe(
          data => {this.students[i] = data[0]},
          error => console.log(error)
        )

      }
    }
    else if(this.nieuwelijstProfskillsFk.length > 0 && this.nieuwelijstLangFk.length == 0 && this.nieuwelijstSkillsFk.length == 0){
      this.students = [];
      for(let i = 0; i < this.nieuwelijstProfskillsFk.length; i++){
        this.studentService.getStudentByIdMysql(this.nieuwelijstProfskillsFk[i].student_fk).subscribe(
          data => {this.students[i] = data[0]},
          error => console.log(error)
        )

      }
    }
    else if(this.nieuwelijstSkillsFk.length > 0 && this.nieuwelijstLangFk.length > 0 && this.nieuwelijstProfskillsFk.length == 0){
      this.students = [];
      let k = 0;
      for(let i = 0; i < this.nieuwelijstSkillsFk.length; i++){
        let double = this.nieuwelijstSkillsFk[i].student_fk;
        for(let j = 0; j < this.nieuwelijstLangFk.length ; j++){
          if(double == this.nieuwelijstLangFk[j].student_fk){
            this.studentService.getStudentByIdMysql(double).subscribe(
              data => {this.students[k] = data[0], console.log(data), k++},
              error => console.log(error)
            )
          }
        }
      }
    }

    else if(this.nieuwelijstSkillsFk.length > 0 && this.nieuwelijstLangFk.length == 0 && this.nieuwelijstProfskillsFk.length > 0){
      this.students = [];
      let k = 0;
      for(let i = 0; i < this.nieuwelijstSkillsFk.length; i++){
        let double = this.nieuwelijstSkillsFk[i].student_fk;
        for(let j = 0; j < this.nieuwelijstProfskillsFk.length ; j++){
          if(double == this.nieuwelijstProfskillsFk[j].student_fk){
            this.studentService.getStudentByIdMysql(double).subscribe(
              data => {this.students[k] = data[0], console.log(data), k++},
              error => console.log(error)
            )
          }
        }
      }
    }
    else if(this.nieuwelijstSkillsFk.length == 0 && this.nieuwelijstLangFk.length > 0 && this.nieuwelijstProfskillsFk.length > 0){
      this.students = [];
      let k = 0;
      for(let i = 0; i < this.nieuwelijstLangFk.length; i++){
        let double = this.nieuwelijstLangFk[i].student_fk;
        for(let j = 0; j < this.nieuwelijstProfskillsFk.length ; j++){
          if(double == this.nieuwelijstProfskillsFk[j].student_fk){
            this.studentService.getStudentByIdMysql(double).subscribe(
              data => {this.students[k] = data[0], console.log(data), k++},
              error => console.log(error)
            )
          }
        }
      }
    }

    else if(this.nieuwelijstSkillsFk.length > 0 && this.nieuwelijstLangFk.length > 0 && this.nieuwelijstProfskillsFk.length > 0){
      this.students = [];
      let k = 0;
      for(let i = 0; i < this.nieuwelijstLangFk.length; i++){
        let double = this.nieuwelijstLangFk[i].student_fk;
        for(let j = 0; j < this.nieuwelijstProfskillsFk.length ; j++){
          if(double == this.nieuwelijstProfskillsFk[j].student_fk){
            for(let m = 0; m < this.nieuwelijstSkillsFk.length; m++){
              if(double == this.nieuwelijstSkillsFk[m].student_fk){
                this.studentService.getStudentByIdMysql(double).subscribe(
                  data => {this.students[k] = data[0], console.log(data), k++},
                  error => console.log(error)
                )
              }
            }

          }
        }
      }
    }


    else{ alert("no students found")}



  }


  clear(){
    window.location.reload();
  }

  //Download the cv in searchBox
  downloadCv(student){

  if(student.cvChecked == true){
    this.cvsService.getCvsByFk(student.id).subscribe(
      data => { this.download(data[0].id)},
      error => console.log(error)
    )
  // window.open(`/api/download/25`);
  }else{
    alert("This students hasn't yet uploaded a CV.")
  }
  }

  refresh: Subject<any> = new Subject();
  download(id){
      this.refresh.next()
      console.log(id);
      if(id){

    //  window.open(`/api/download/${id}`);
    }


  }

  innerjoin (){

    for(let id of this.ids){

      console.log(id.id)
      this.http.get(`/api/innerjoin/${id.id}`).subscribe(
        data => {this.studentjes += data, console.log(data)},
        error => {console.log("gelukt")}
      )
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';
import { ProfessionalService } from '../../services/professional.service';
import { LanguageService } from '../../services/language.service';
import { ContactService } from '../../services/contact.service';
import { CvsService } from '../../services/cvs.service';
import { DataService } from '../../services/data.service';
import { CompanyService } from '../../services/company/company.service';
import { OrderListModule } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/primeng';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';

import { Subject } from 'rxjs/Subject';

import { FilterPipe } from '../../pipes/student-list.pipe';
import { FilterSkill } from '../../pipes/filterSkill.pipe';
import { FilterProfessional } from '../../pipes/filterProfessional.pipe';
import { FilterLanguage } from '../../pipes/filterLanguage.pipe';
import { JwtHelper } from 'angular2-jwt';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [FilterPipe, FilterSkill, FilterProfessional, FilterLanguage]

})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService,
    private userService: UserService,
    private skillService: SkillService,
    private languageService: LanguageService,
    private professionalService: ProfessionalService,
    private cvsService: CvsService,
    private contactService: ContactService,
    public companyService: CompanyService,
    private http: HttpClient,
    public auth: AuthService,
    private dataService: DataService,
    public toast: ToastComponent) { }

  students = [];
  ids = [];
  skills = [];
  proffskills = [];
  languages = [];
  cities = [];
  studentjes: any;
  jwtHelper: JwtHelper = new JwtHelper();

  filters = ['Name', 'Degree'];
  model = {
    filter: this.filters[0]
  };

  public searchText: any;
  public searchSkill: any;
  public searchProf: any;
  public searchLang: any;
  public priority: any;
  public company: any;



  // review tom: added variable p
  public p: any;

  ngOnInit() {
    if(this.auth.loggedIn == false && this.auth.currentUser.role !== "Company" ){
      this.auth.loginStudent(localStorage.getItem('token'));
    }
    
    this.getStudents();
    this.getStudentsIds();
    this.getSkills();
    this.getLanguages();
    this.getProffskills();
    // this.getCounty();

    if(this.auth.currentUser.role == "Company"){
      this.getCompanyById(this.auth.currentUser);
    }

  }

  getCompanyById(currentUser){
    this.companyService.getCompanyByEmailMysql(currentUser.email).subscribe(
      data => {
        this.company = data[0];
        this.priority = data[0].priority;
      },
      error => console.log("error")
    );
  }

  //Get all students -> add to students[]
  getStudents() {
    this.studentService.getStudentsMysql().subscribe(
      data => {
        this.students = data;
      },
      error => console.log(error)
    )
  }
  //Get all the ids of the students -> add to ids[]
  getStudentsIds() {
    this.studentService.getStudentsIdsMysql().subscribe(
      data => {
        for(let id of data){
          this.ids.push(id.id);
        }
      },
      error => console.log(error)
    )
  }
  //get all distinct skills of all students -> add to skills[]
  //sort them alphabetically
  getSkills() {
    this.skillService.getSkillsDistinct().subscribe(
      data => { this.skills = data, this.sort(this.skills) },
      error => console.log(error)
    )
  }
  //get all disctinct professional skills of all students -> add to proffskills[]
  getProffskills() {
    this.professionalService.getProfessionalDistinct().subscribe(
      data => { this.proffskills = data, this.sort(this.proffskills) },
      error => console.log(error)
    )
  }
  //get all distinct languages -> add them to languages[]
  getLanguages() {
    this.languageService.getLanguagesDistinct().subscribe(
      data => { this.languages = data, this.sortLang(this.languages) },
      error => console.log(error)
    )
  }

  getCounty(){
    this.contactService.getCounty().subscribe(
      data => { this.cities = data, this.sortCities(this.cities), console.log(this.cities)},
      error => console.log(error)
    )

  }

  //sort array on skills alphabetically
  sort(array) {
    array.sort(function (name1, name2) {
      if (name1.skill < name2.skill) {
        return -1;
      } else if (name1.skill > name2.skill) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  //sort array on language type alphabetically
  sortCities(array) {
    array.sort(function (name1, name2) {
      if (name1.type < name2.type) {
        return -1;
      } else if (name1.city > name2.city) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  //sort array on language type alphabetically
  sortLang(array) {
    array.sort(function (name1, name2) {
      if (name1.type < name2.type) {
        return -1;
      } else if (name1.type > name2.type) {
        return 1;
      } else {
        return 0;
      }
    });
  }



  //order by gradYear in searchBox when clicking on 'GradYear'
  clickGrad = 0;
  sortGradYear() {
    if (this.clickGrad == 0) {
      this.students.sort(function (name1, name2) {
        if (name1.gradYear < name2.gradYear) {
          return -1;
        } else if (name1.gradYear > name2.gradYear) {
          return 1;
        } else {
          return 0;
        }
      });
      this.clickGrad = 1;
    }
    else {
      this.students.sort(function (name1, name2) {
        if (name1.gradYear > name2.gradYear) {
          return -1;
        } else if (name1.gradYear < name2.gradYear) {
          return 1;
        } else {
          return 0;
        }
      });
      this.clickGrad = 0;
    }
  }
  //order by Name in searchBox when clicking on 'Name'
  clickName = 0;
  sortName() {
    if (this.clickName == 0) {
      this.students.sort(function (name1, name2) {
        if (name1.name < name2.name) {
          return -1;
        } else if (name1.name > name2.name) {
          return 1;
        } else {
          return 0;
        }
      });
      this.clickName = 1;
    }
    else {
      this.students.sort(function (name1, name2) {
        if (name1.name > name2.name) {
          return -1;
        } else if (name1.name < name2.name) {
          return 1;
        } else {
          return 0;
        }
      });
      this.clickName = 0;
    }
  }

  //order by Name in searchBox when clicking on 'Name'
  clickDegree = 0;
  sortDegree() {
    if (this.clickDegree == 0) {
      this.students.sort(function (name1, name2) {
        if (name1.degree < name2.degree) {
          return -1;
        } else if (name1.degree > name2.degree) {
          return 1;
        } else {
          return 0;
        }
      });
      this.clickDegree = 1;
    }
    else {
      this.students.sort(function (name1, name2) {
        if (name1.degree > name2.degree) {
          return -1;
        } else if (name1.degree < name2.degree) {
          return 1;
        } else {
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
  fk_list = [];
  checkedSkill = 0;
  noDupe = [];
  inputSkillCheck(e, skill) {
    if (e.target.checked) {
      this.checkedSkill++;
      this.skillsChecked[this.skillsChecked.length] = skill;
      if (skill != "") {
        this.skillService.getFkbySkill(skill).subscribe(
          data => {
            for (let i = 0; i < data.length; i++) {
              this.skillFk.push(data[i]);
              this.fk_list.push(data[i].student_fk);
            }
            this.noDupe = Array.from(new Set(this.fk_list));
          },
          error => console.log(error)
        )
      }
    }
    else {
      this.checkedSkill--;
      for (let i = 0; i < this.skillsChecked.length; i++) {
        if (this.skillsChecked[i] == skill) {
          this.skillsChecked.splice(i, 1);

        }
      }

      for (let i = 0; i < this.skillFk.length; i++) {
        if (this.skillFk[i].skill.toLowerCase() == skill.toLowerCase()) {
          this.skillFk.splice(i, 1);
          this.fk_list.splice(i, 1);
          i--;
        }
      }
      this.noDupe = Array.from(new Set(this.fk_list));
    }
  }




  //keep track of what a person checks -> by checking a skill, the student_fk
  //  is stored inside profskillFk[]
  // checkedProf keeps track of how many skills there are checked
  profskillFk = [];
  profSkillsChecked = [];
  checkedProf = 0;
  inputProfskillCheck(e, skill) {
    if (e.target.checked) {
      this.checkedProf++;
      this.profSkillsChecked[this.profSkillsChecked.length] = skill;
      if (skill != "") {
        this.professionalService.getFkbySkill(skill).subscribe(
          data => {
            let result = this.dataService.decryption(data);
            for (let i = 0; i < result.length; i++) {
              this.profskillFk.push(result[i]);
              this.fk_list.push(result[i].student_fk);
            }
            this.noDupe = Array.from(new Set(this.fk_list));
          },
          error => console.log(error)
        )
      }
    }
    else {
      this.checkedProf--;
      for (let i = 0; i < this.profSkillsChecked.length; i++) {
        if (this.profSkillsChecked[i] == skill) {
          this.profSkillsChecked.splice(i, 1);

        }
      }

      for (let i = 0; i < this.profskillFk.length; i++) {
        if (this.profskillFk[i].skill.toLowerCase() == skill.toLowerCase()) {
          this.profskillFk.splice(i, 1);
          this.fk_list.splice(i, 1);
          i--;
        }
      }
      this.noDupe = Array.from(new Set(this.fk_list));
    }
  }


  //keep track of what a person checks -> by checking a language, the student_fk
  //  is stored inside languageFk[]
  // checkedLang keeps track of how many skills there are checked
  languageFk = [];
  languageChecked = [];
  checkedLang = 0;
  inputLanguageCheck(e, type) {
    if (e.target.checked) {
      this.checkedLang++;
      this.languageChecked[this.languageChecked.length] = type;
      if (type != "") {
        this.languageService.getFkbyLang(type).subscribe(
          data => {
            let result = this.dataService.decryption(data);
            for (let i = 0; i < result.length; i++) {
              this.languageFk.push(result[i]);
              this.fk_list.push(result[i].student_fk);
            }
            this.noDupe = Array.from(new Set(this.fk_list));
          },
          error => console.log(error)
        )
      }
    }
    else {
      this.checkedLang--;
      for (let i = 0; i < this.languageChecked.length; i++) {
        if (this.languageChecked[i] == type) {
          this.languageChecked.splice(i, 1);

        }
      }

      for (let i = 0; i < this.languageFk.length; i++) {
        if (this.languageFk[i].type.toLowerCase() == type.toLowerCase()) {
          this.languageFk.splice(i, 1);
          this.fk_list.splice(i, 1);
          i--;
        }
      }
      this.noDupe = Array.from(new Set(this.fk_list));
    }
  }



  //This method gives all the students back with the checked conditions.
  advancedSearch() {
    //ADVANCED SEARCH
    if (this.noDupe.length > 0 ) {
      this.students = [];
      for (let i = 0; i < this.noDupe.length; i++) {
        this.studentService.getStudentByIdMysql(this.noDupe[i]).subscribe(
          data => {
            this.students[i] = data[0];
          },
          error => console.log(error)
        )
      }
    }
    else { alert("no students found") }
  }


  clear() {
    window.location.reload();
  }

  // //Download the cv in searchBox
  // downloadCv(student) {

  //   if (student.cvChecked == true) {
  //     this.cvsService.getCvsByFk(student.id).subscribe(
  //       data => { this.download(data[0].id) },
  //       error => console.log(error)
  //     )
  //     window.open(`/api/download/25`);
  //   } else {
  //     alert("This students hasn't yet uploaded a CV.")
  //   }
  // }

  // refresh: Subject<any> = new Subject();
  // download(id) {
  //   this.refresh.next()
  //   if (id) {

  //     //  window.open(`/api/download/${id}`);
  //   }
  // }

  deleteStudent(student) {
    this.userService.deleteWholeUser(student).subscribe(
      data => {
        const pos = this.students.map(elem => elem.id).indexOf(student.id);
        this.students.splice(pos, 1);
        this.toast.setMessage('item deleted successfully.', 'success');
      },
      error => console.error
    );
  }

  // innerjoin() {

  //   for (let id of this.ids) {
  //     this.http.get(`/api/innerjoin/${id.id}`).subscribe(
  //       data => { this.studentjes += data, console.log(data) },
  //       error => { console.log("gelukt") }
  //     )
  //   }
  // }


}

import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { SkillService } from '../../services/skill.service';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'profile-skills',  // <home></home>
  styleUrls: ['./profile-skills.component.scss'],
  templateUrl: './profile-skills.component.html'
})
export class SkillsProfile {



  public editMode = false;
  public isUpdated = false;


  data: any;
  @Input() student: any;
  @Input() skills = [];

  filters = ['Learning', 'Basic', 'Intermediate', 'Expert'];
  model = {
    filter: this.filters[0]
  };

  registerForm: FormGroup;
  skill = new FormControl(String);
  value = new FormControl(String);
  value_type = new FormControl(String);
  student_fk = new FormControl(String);

  constructor(private studentService: StudentService,
    private skillService: SkillService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    public auth: AuthService) { }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      skill: this.skill,
      value: this.value,
      value_type: this.value_type,
      student_fk: this.student_fk,
    });
  }

  save(student, skills) {
    this.editMode = false;
    for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i]) {
        this.skillService.editSkill(this.skills[i]).subscribe(
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

  add(student) {

    if (student.countSkills < 7) {
      this.registerForm.value.skill = 'Example';
      this.registerForm.value.value = 100;
      this.registerForm.value.value_type = 'Expert';
      this.registerForm.value.student_fk = student.id;
      this.skillService.addSkillFromStudentId(this.registerForm.value).subscribe(
        res => {this.getSkills(student.id)},
        error => {console.log("error")}
      );
      student.countSkills++;
    }
  }

  getSkills(id){
    this.skillService.getSkillByStudentId(id).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.skills = data;
      }
    )
  }

  delete(student, skills) {
    if (student.countSkills > 0) {
      let id = skills[skills.length - 1].id;
      student.countSkills--;
      this.skills.splice(skills.length - 1, 1);
        this.skillService.deleteSkill(id).subscribe(
        res => {this.save(student, skills)}
      );
    }
  }

  onChange(skills){
    if (skills.value_type == this.filters[0]) {
      skills.value = 25;
      skills.value_type = this.filters[0];
      this.isUpdated = true;
    }
    if (skills.value_type == this.filters[1]) {
      skills.value = 50;
      skills.value_type = this.filters[1];
      this.isUpdated = true;
    }
    if (skills.value_type == this.filters[2]) {
      skills.value = 75;
      skills.value_type = this.filters[2];
      this.isUpdated = true;
    }
    if (skills.value_type == this.filters[3]) {
      skills.value = 100;
      skills.value_type = this.filters[3];
      this.isUpdated = true;
    }
  }

}

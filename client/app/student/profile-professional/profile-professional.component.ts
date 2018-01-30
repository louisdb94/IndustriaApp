import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ProfessionalService } from '../../services/professional.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'profile-professional',  // <home></home>
  styleUrls: ['./profile-professional.component.scss'],
  templateUrl: './profile-professional.component.html'
})
export class ProfessionalProfile {

  public editMode = false;
  public valueInput: number;
  public isUpdated = false;

  data: any;
  @Input() student: any;
  @Input() professional = [];

  filters = ['Learning', 'Basic', 'Intermediate', 'Expert'];
  model = {
    filter: this.filters[0]
  };


  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private professionalService: ProfessionalService,
    public toast: ToastComponent,
    private http: HttpClient,
    public auth: AuthService) { }


  save(student, professional) {
    this.editMode = false;

    for (let i = 0; i < this.professional.length; i++) {
      if (this.professional[i]) {
      this.professionalService.editProfessional(this.professional[i]).subscribe(
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
    if (student.countProfessional < 7) {
      this.http.get(`/api/professional-insert/${student.id}`).subscribe(
        res => {this.getProfessional(student.id)},
        error => {console.log("error")}
      );
      // let add_professional = {id: '', student_fk: '', value: '50', value_type: 'Intermediate'};
      // this.professional.push(add_professional);
      student.countProfessional++;
    }
  }

  getProfessional(id){
    this.professionalService.getProfessionalByStudentId(id).subscribe(
      res => {this.professional = res}
    )
  }

  delete(student, professional) {
    if (student.countProfessional > 0) {
      let id = professional[professional.length - 1].id;
      student.countProfessional--;
      this.professional.splice(professional.length - 1, 1);
      this.http.get(`/api/professional-delete/${id}`).subscribe(
        res => {this.save(student, professional)}
      );
    }
  }

  onChange(professional){
    if (professional.value_type == this.filters[0]) {
      professional.value = 25;
      professional.value_type = this.filters[0];
      this.isUpdated = true;
    }
    if (professional.value_type == this.filters[1]) {
      professional.value = 50;
      professional.value_type = this.filters[1];
      this.isUpdated = true;
    }
    if (professional.value_type == this.filters[2]) {
      professional.value = 75;
      professional.value_type = this.filters[2];
      this.isUpdated = true;
    }
    if (professional.value_type == this.filters[3]) {
      professional.value = 100;
      professional.value_type = this.filters[3];
      this.isUpdated = true;
    }
  }
}

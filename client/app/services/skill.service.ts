import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getSkillById(id): Observable<any> {
    return this.http.get(`/api/skills-get/${id}`, {headers: this.header});}

  getSkillByStudentId(id): Observable<any> {
    return this.http.get(`/api/skills-getbystudentfk/${id}`, {headers: this.header});
  }

  getSkills(): Observable<any> {
    return this.http.get(`/api/skills-getall`, {headers: this.header});
  }

  getSkillsDistinct(): Observable<any> {
    return this.http.get(`/api/skills-getalldistinct`, {headers: this.header});
  }

  // addSkill(skill): Observable<any> {
  //   return this.http.post('/api/skills-insert', JSON.stringify(skill), {headers: this.header});
  // }

  deleteSkill(id): Observable<any> {
    return this.http.delete(`/api/skills-delete/${id}`, {headers: this.header});
  }

  addSkillFromStudentId(form): Observable<any> {
    return this.http.post(`/api/skills-insert`, JSON.stringify(form), {headers: this.header});
  }

  editSkill(skill): Observable<any> {
    return this.http.put(`/api/skills-update`, JSON.stringify(skill), {headers: this.header});
  }

  getFkbySkill(skill): Observable<any> {
    return this.http.get(`api/skills-getfkbyskill/${skill}`, {headers: this.header});
  }

}

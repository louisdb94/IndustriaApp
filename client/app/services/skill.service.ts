import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getSkillById(id): Observable<any> {
    return this.http.get(`/api/skills-get/${id}`).map(res => res.json());}

  getSkillByStudentId(id): Observable<any> {
    return this.http.get(`/api/skills-getbystudentfk/${id}`).map(res => res.json());
  }

  getSkills(): Observable<any> {
    return this.http.get(`/api/skills-getall`).map(res => res.json());
  }

  getSkillsDistinct(): Observable<any> {
    return this.http.get(`/api/skills-getalldistinct`).map(res => res.json());
  }

  addSkill(skill): Observable<any> {
    return this.http.post('/api/skills-insert', JSON.stringify(skill), this.options);
  }

  deleteSkill(skill): Observable<any> {
    return this.http.get(`/api/skills-delete/${skill}`, this.options);
  }

  addSkillFromStudentId(id): Observable<any> {
    return this.http.get(`/api/skills-insert/${id}`, this.options);
  }

  editSkill(skill): Observable<any> {
    return this.http.put(`/api/skills-update`, JSON.stringify(skill), this.options);
  }

  getFkbySkill(skill): Observable<any> {
    return this.http.get(`api/skills-getfkbyskill/${skill}`).map(res => res.json());
  }


}

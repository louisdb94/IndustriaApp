import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ExperienceService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getExperienceById(id): Observable<any> {
    console.log("In de experiece service");
    return this.http.get(`/api/experiences-get/${id}`).map(res => res.json());
  }

  getExperiences(): Observable<any> {
    return this.http.get(`/api/experience-getall`).map(res => res.json());
  }

  addExperience(education): Observable<any> {
    return this.http.post('/api/experience-insert', JSON.stringify(education), this.options);
  }

  deleteExperience(id): Observable<any> {
    return this.http.delete(`/api/experiences-delete/${id}`, this.options);
  }

  addExperienceFromStudentId(id): Observable<any> {
    return this.http.get(`/api/experience-insert/${id}`, this.options);
  }

  addExperienceForm(form): Observable<any> {
    return this.http.post('/api/experience-insertform', JSON.stringify(form), this.options);
  }


}

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
    return this.http.get(`/api/experience-get/${id}`).map(res => res.json());
  }

  getExperiences(): Observable<any> {
    return this.http.get(`/api/experience-getall`).map(res => res.json());
  }

  addExperience(education): Observable<any> {
    return this.http.post('/api/experience-insert', JSON.stringify(education), this.options);
  }

  deleteExperience(experience): Observable<any> {
    return this.http.get(`/api/experience-delete/${experience.id}`, this.options);
  }

  addExperienceFromStudentId(id): Observable<any> {
    return this.http.get(`/api/experience-insert/${id}`, this.options);
  }


}

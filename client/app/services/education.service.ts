import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EducationService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getEducationById(id): Observable<any> {
    return this.http.get(`/api/education-get/${id}`).map(res => res.json());
  }

  getEducations(): Observable<any> {
    return this.http.get(`/api/education-getall`).map(res => res.json());
  }

  addEducation(education): Observable<any> {
    return this.http.post('/api/educatino-insert', JSON.stringify(education), this.options);
  }

  deleteEducation(education): Observable<any> {
    return this.http.get(`/api/education-delete/${education.id}`, this.options);
  }

  addEducationFromStudentId(id): Observable<any> {
    return this.http.get(`/api/education-insert/${id}`, this.options);
  }

  editEducation(education): Observable<any> {
    return this.http.put(`/api/education-update`, JSON.stringify(education), this.options);
  }


}

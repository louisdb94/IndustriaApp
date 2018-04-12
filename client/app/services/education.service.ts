import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EducationService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }


  //MYSQL

  getEducationById(id): Observable<any> {
    return this.http.get(`/api/education-get/${id}`, {headers: this.header});
  }

  getEducations(): Observable<any> {
    return this.http.get(`/api/education-getall`, {headers: this.header});
  }

  addEducation(education): Observable<any> {
    return this.http.post('/api/educatino-insert', JSON.stringify(education), {headers: this.header});
  }

  deleteEducation(education): Observable<any> {
    return this.http.get(`/api/education-delete/${education.id}`, {headers: this.header});
  }

  addEducationFromStudentId(id): Observable<any> {
    return this.http.get(`/api/education-insert/${id}`, {headers: this.header});
  }

  editEducation(education): Observable<any> {
    return this.http.put(`/api/education-update`, JSON.stringify(education), {headers: this.header});
  }


}

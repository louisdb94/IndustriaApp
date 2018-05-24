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

  deleteEducation(id): Observable<any> {
    return this.http.delete(`/api/education-delete/${id}`, {headers: this.header});
  }

  addEducationFromStudentId(form): Observable<any> {
    return this.http.post(`/api/education-insertForm`, JSON.stringify(form), {headers: this.header});
  }

  editEducation(education): Observable<any> {
    return this.http.put(`/api/education-update`, JSON.stringify(education), {headers: this.header});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfessionalService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getProfessionalById(id): Observable<any> {
    return this.http.get(`/api/professional-get/${id}`, {headers: this.header});}

  getProfessionalByStudentId(id): Observable<any> {
    return this.http.get(`/api/professional-getbystudentfk/${id}`, {headers: this.header});
  }

  getProfessional(): Observable<any> {
    return this.http.get(`/api/professional-getall`, {headers: this.header});
  }

  getProfessionalDistinct(): Observable<any> {
    return this.http.get(`/api/professional-getalldistinct`, {headers: this.header});
  }

  deleteProfessional(id): Observable<any> {
    return this.http.delete(`/api/professional-delete/${id}`, {headers: this.header});
  }

  addProfessionalFromStudentId(form): Observable<any> {
    return this.http.post(`/api/professional-insert`, JSON.stringify(form), {headers: this.header});
  }

  editProfessional(professional): Observable<any> {
    return this.http.put(`/api/professional-update`, JSON.stringify(professional), {headers: this.header});
  }

  getFkbySkill(skill): Observable<any> {
    return this.http.get(`api/professional-getfkbyskill/${skill}`, {headers: this.header});
  }


}

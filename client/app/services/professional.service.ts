import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfessionalService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getProfessionalById(id): Observable<any> {
    return this.http.get(`/api/professional-get/${id}`).map(res => res.json());}
    
  getProfessionalByStudentId(id): Observable<any> {
    return this.http.get(`/api/professional-getbystudentfk/${id}`).map(res => res.json());
  }

  getProfessional(): Observable<any> {
    return this.http.get(`/api/professional-getall`).map(res => res.json());
  }

  addProfessional(professional): Observable<any> {
    return this.http.post('/api/professional-insert', JSON.stringify(professional), this.options);
  }

  deleteProfessional(professional): Observable<any> {
    return this.http.get(`/api/professional-delete/${professional.id}`, this.options);
  }

  addProfessionalFromStudentId(id): Observable<any> {
    return this.http.get(`/api/professional-insert/${id}`, this.options);
  }

  editProfessional(professional): Observable<any> {
    return this.http.put(`/api/professional-update`, JSON.stringify(professional), this.options);
  }


}
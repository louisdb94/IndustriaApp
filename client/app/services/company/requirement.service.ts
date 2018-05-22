import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyRequirementService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth'  });

  constructor(private http: HttpClient) { }

  //MYSQL

  getRequirementById(id): Observable<any> {
    return this.http.get(`/api/requirements-get/${id}`, {headers: this.header});
  }

  getRequirements(): Observable<any> {
    return this.http.get(`/api/requirements-getall`, {headers: this.header});
  }

  deleteRequirement(id): Observable<any> {
    return this.http.delete(`/api/requirements-delete/${id}`, {headers: this.header});
  }

  addRequirementForm(form): Observable<any> {
    return this.http.post('/api/requirements-insertform', JSON.stringify(form), {headers: this.header});
  }

  editRequirements(requirement): Observable<any> {
    return this.http.put(`/api/requirements-update`, JSON.stringify(requirement), {headers: this.header});
  }


}

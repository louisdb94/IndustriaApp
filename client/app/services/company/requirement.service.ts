import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyRequirementService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getRequirementById(id): Observable<any> {
    return this.http.get(`/api/requirements-get/${id}`).map(res => res.json());
  }

  getRequirements(): Observable<any> {
    return this.http.get(`/api/requirements-getall`).map(res => res.json());
  }

  addExperience(education): Observable<any> {
    return this.http.post('/api/requirements-insert', JSON.stringify(education), this.options);
  }

  deleteRequirement(id): Observable<any> {
    return this.http.delete(`/api/requirements-delete/${id}`, this.options);
  }

  addRequirementFromCompanyId(id): Observable<any> {
    return this.http.get(`/api/requirements-insert/${id}`, this.options);
  }

  addRequirementForm(form): Observable<any> {
    return this.http.post('/api/requirements-insertform', JSON.stringify(form), this.options);
  }

  editRequirements(requirement): Observable<any> {
    return this.http.put(`/api/requirements-update`, JSON.stringify(requirement), this.options);
  }


}

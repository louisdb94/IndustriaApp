import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getCompanyById(id): Observable<any> {
    return this.http.get(`/api/companies-get/${id}`).map(res => res.json());
  }

  getCompanies(): Observable<any> {
    return this.http.get(`/api/companies-getall`).map(res => res.json());
  }

  getCompaniesPriorities(): Observable<any> {
    return this.http.get(`/api/companies-getallpriorities`).map(res => res.json());
  }

  addCompany(company): Observable<any> {
    return this.http.post('/api/companies-insert', JSON.stringify(company), this.options);
  }

  deleteCompany(company): Observable<any> {
    return this.http.get(`/api/companies-delete/${company.id}`, this.options);
  }

  addCompanyFromUserId(id): Observable<any> {
    return this.http.get(`/api/companies-insert/${id}`, this.options);
  }

  addPrioritiesFromCompanyId(company): Observable<any> {
    return this.http.post(`/api/companies-priority`, JSON.stringify(company), this.options);
  }

  deletePrioritiesFromCompanyId(id): Observable<any> {
    return this.http.get(`/api/companies-deletepriority/${id}`, this.options);
  }

  innerJoin(id): Observable<any> {
    return this.http.get(`/api/companies-innerJoin/${id}`, this.options);
  }

  editCompany(company): Observable<any> {
    return this.http.put(`/api/companies-update`, JSON.stringify(company), this.options);
  }

  getinnerjoin(): Observable<any> {
    return this.http.get('api/companies-innerjoin').map(res => res.json());
  }

  getCompanyByEmailMysql(email): Observable<any> {
    return this.http.get(`/api/companies-getbyemail/${email}`).map(res => res.json());
  }

  editPriority(priority): Observable<any> {
    return this.http.put(`/api/companies-updatepriority`, JSON.stringify(priority), this.options);
  }

  editPriorityCompany(priority): Observable<any> {
    return this.http.put(`/api/companies-updatepriorityCompany`, JSON.stringify(priority), this.options);
  }


}

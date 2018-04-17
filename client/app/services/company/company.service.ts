import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

  constructor(private http: HttpClient) { }


  //MYSQL

  getCompanyById(id): Observable<any> {
    return this.http.get(`/api/companies-get/${id}`, {headers: this.header});
  }

  getCompanies(): Observable<any> {
    return this.http.get(`/api/companies-getall`, {headers: this.header});
  }

  getCompaniesPriorities(): Observable<any> {
    return this.http.get(`/api/companies-getallpriorities`, {headers: this.header});
  }

  // addCompany(company): Observable<any> {
  //   return this.http.post('/api/companies-insert', JSON.stringify(company), {headers: this.header});
  // }

  deleteCompany(company): Observable<any> {
    return this.http.delete(`/api/companies-delete/${company.id}`, {headers: this.header});
  }

  addCompanyFromUserId(company): Observable<any> {
    return this.http.post(`/api/companies-insert`, JSON.stringify(company), {headers: this.header});
  }

  addPrioritiesFromCompanyId(addPriority): Observable<any> {
    return this.http.post(`/api/companies-priority`, JSON.stringify(addPriority), {headers: this.header});
  }

  deletePrioritiesFromCompanyId(company_fk): Observable<any> {
    return this.http.get(`/api/companies-deletepriority/${company_fk}`, {headers: this.header});
  }

  editCompany(company): Observable<any> {
    return this.http.put(`/api/companies-update`, JSON.stringify(company), {headers: this.header});
  }

  getinnerjoin(): Observable<any> {
    return this.http.get('api/companies-innerjoin', {headers: this.header});
  }

  getCompanyByEmailMysql(email): Observable<any> {
    return this.http.get(`/api/companies-getbyemail/${email}`, {headers: this.header});
  }

  editPriority(priority): Observable<any> {
    return this.http.put(`/api/companies-updatepriority`, JSON.stringify(priority), {headers: this.header});
  }

  editPriorityCompany(priority): Observable<any> {
    return this.http.put(`/api/companies-updatepriorityCompany`, JSON.stringify(priority), {headers: this.header});
  }


}

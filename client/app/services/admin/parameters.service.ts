import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ParametersService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

  constructor(private http: HttpClient) { }


  //MYSQL

  getParametersByAdmin(): Observable<any> {
    return this.http.get(`/api/parameters-getparamsbyadmin`,{headers: this.header});
  }

  getParameters(): Observable<any> {
    return this.http.get(`/api/parameters-getall`,{headers: this.header});
  }

  getParametersCompany(): Observable<any> {
    return this.http.get(`/api/parameters-getparamscompany`,{headers: this.header});
  }

  getParametersForCompany(user_fk): Observable<any> {
    return this.http.get(`/api/parameters-getforcompany/${user_fk}`,{headers: this.header});
  }

  addParam(param): Observable<any> {
    return this.http.post(`/api/parameters-add`, JSON.stringify(param), {headers: this.header});
  }

  deleteParameter(id): Observable<any> {
    return this.http.delete(`/api/parameters-delete/${id}`, {headers: this.header});
  }

  deletePriorityFromValue(value): Observable<any> {
    return this.http.delete(`/api/parameters-deletefromvalue/${value}`, {headers: this.header});
  }

}

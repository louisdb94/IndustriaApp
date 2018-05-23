import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: HttpClient, private h: Http) { }

  //MYSQL

  getAllUsers(): Observable<any> {
    return this.http.get('/api/users-getall', {headers: this.header});
  }

  getUserByRoleMysql(): Observable<any> {
    return this.http.get(`/api/user-getbyrole`, {headers: this.header});
  }

  registerMysql(user): Observable<any> {
    return this.http.post('/api/users-insert', JSON.stringify(user), {headers: this.header});
  }

  getUserMysql(rnumber): Observable<any> {
    return this.http.get(`/api/users-getbyrnumber/${rnumber}`, {headers: this.header});
  }

  loginMysql(credentials): Observable<any> {
    return this.h.post('/api/users-login', JSON.stringify(credentials), this.options);
  }

  deleteWholeUser(student): Observable<any> {
    return this.http.get(`api/delete-student/${student.id}`, {headers: this.header});
  }

  deleteWholeCompany(user): Observable<any> {
    return this.http.post(`api/delete-company`,JSON.stringify(user), {headers: this.header});
  }

  makeAdmin(user): Observable<any> {
    return this.http.put(`/api/user-makeadmin`, JSON.stringify(user), {headers: this.header});
  }
  deleteAdmin(user): Observable<any> {
    return this.http.put(`/api/user-deleteadmin`, JSON.stringify(user), {headers: this.header});
  }

  getadmin(): Observable<any> {
    return this.http.get(`/api/user-getadmin`, {headers: this.header});
  }

}

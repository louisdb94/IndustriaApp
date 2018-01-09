import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  register(user): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(credentials), this.options);
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/users').map(res => res.json());
  }

  countUsers(): Observable<any> {
    return this.http.get('/api/users/count').map(res => res.json());
  }

  addUser(user): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
    return this.http.get(`/api/user/${user._id}`).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(`/api/user/${user._id}`, this.options);
  }

  //MYSQL

  getUserByRoleMysql(): Observable<any> {
    return this.http.get(`/api/user-getbyrole`).map(res => res.json());
  }

  registerMysql(user): Observable<any> {
    return this.http.post('/api/users-insert', JSON.stringify(user), this.options);
  }

  getUserMysql(rnumber): Observable<any> {
    return this.http.get(`/api/users-getbyrnumber/${rnumber}`).map(res => res.json());
  }

  loginMysql(credentials): Observable<any> {
    return this.http.post('/api/users-login', JSON.stringify(credentials), this.options);
  }

  deleteWholeUser(user): Observable<any> {
    return this.http.get(`api/delete-user/${user.id}`, this.options);
  }



}

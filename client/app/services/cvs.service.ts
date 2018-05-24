import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CvsService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getCvsById(id): Observable<any> {
    return this.http.get(`/api/cvs-get/${id}`, {headers: this.header});
  }

  getCvsByFk(id): Observable<any> {
    return this.http.get(`/api/cv/${id}`, {headers: this.header});
  }

  getCvs(): Observable<any> {
    return this.http.get(`/api/cvs-getall`, {headers: this.header});
  }

  addCv(cv): Observable<any> {
    return this.http.post('/api/cvs-insert', JSON.stringify(cv), {headers: this.header});
  }

  deleteCv(cv): Observable<any> {
    return this.http.get(`/api/cvs-delete/${cv.id}`, {headers: this.header});
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CvsService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getCvsById(id): Observable<any> {
    return this.http.get(`/api/cvs-get/${id}`).map(res => res.json());
  }

  getCvs(): Observable<any> {
    return this.http.get(`/api/cvs-getall`).map(res => res.json());
  }

  addCv(cv): Observable<any> {
    return this.http.post('/api/cvs-insert', JSON.stringify(cv), this.options);
  }

  deleteCv(cv): Observable<any> {
    return this.http.get(`/api/cvs-delete/${cv.id}`, this.options);
  }



}

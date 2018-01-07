import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PrivacylogService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  insertPrivacylog(privacylog): Observable<any> {
    return this.http.post('/api/privacylog-insert', JSON.stringify(privacylog), this.options);
  }

  deletePrivacylog(id): Observable<any> {
    return this.http.delete(`/api/privacylog-delete/${id}`, this.options);
  }

}
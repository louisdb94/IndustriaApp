import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialmediaService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getSocialmediaById(id): Observable<any> {
    return this.http.get(`/api/socialmedia-get/${id}`).map(res => res.json());
  }

  getSocialmedia(): Observable<any> {
    return this.http.get(`/api/socialmedia-getall`).map(res => res.json());
  }

  addSocialmedia(socialmedia): Observable<any> {
    return this.http.post('/api/socialmedia-insert', JSON.stringify(socialmedia), this.options);
  }

  deleteSocialmedia(socialmedia): Observable<any> {
    return this.http.get(`/api/socialmedia-delete/${socialmedia.id}`, this.options);
  }


}

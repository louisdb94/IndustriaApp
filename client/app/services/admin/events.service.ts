import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  insertEvent(event): Observable<any> {
    return this.http.post('/api/events-insert', JSON.stringify(event), this.options);
  }

  getEvents(): Observable<any> {
    return this.http.get(`/api/events-getall`).map(res => res.json());
  }

  editEvent(event): Observable<any> {
    return this.http.put(`/api/events-update`, JSON.stringify(event), this.options);
  }

  deleteEvent(id): Observable<any> {
    return this.http.delete(`/api/events-delete/${id}`, this.options);
  }

}
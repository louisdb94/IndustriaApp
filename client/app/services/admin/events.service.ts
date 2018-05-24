import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8','x-industria-auth' : 'auth'  });

  constructor(private http: HttpClient) { }

  //MYSQL

  insertEvent(event): Observable<any> {
    return this.http.post('/api/events-insert', JSON.stringify(event), {headers: this.header});
  }

  getEvents(): Observable<any> {
    return this.http.get(`/api/events-getall`,{headers: this.header});
  }

  editEvent(event): Observable<any> {
    return this.http.put(`/api/events-update`, JSON.stringify(event), {headers: this.header});
  }

  deleteEvent(id): Observable<any> {
    return this.http.delete(`/api/events-delete/${id}`, {headers: this.header});
  }

}

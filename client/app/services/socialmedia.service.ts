import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialmediaService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getSocialmediaById(id): Observable<any> {
    return this.http.get(`/api/socialmedia-get/${id}`, {headers: this.header});
  }

  getSocialmedia(): Observable<any> {
    return this.http.get(`/api/socialmedia-getall`, {headers: this.header});
  }

  // addSocialmedia(socialmedia): Observable<any> {
  //   return this.http.post('/api/socialmedia-insert', JSON.stringify(socialmedia), {headers: this.header});
  // }

  // deleteSocialmedia(socialmedia): Observable<any> {
  //   return this.http.get(`/api/socialmedia-delete/${socialmedia.id}`, {headers: this.header});
  // }

  // addSocialmediaFromStudentId(id): Observable<any> {
  //   return this.http.get(`/api/socialmedia-insert/${id}`, {headers: this.header});
  // }

  editSocialmediaMysql(socialmedia): Observable<any> {
    return this.http.put(`/api/socialmedia-update`, JSON.stringify(socialmedia), {headers: this.header});
  }

}

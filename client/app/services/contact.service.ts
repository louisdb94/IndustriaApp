import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getContactById(id): Observable<any> {
    return this.http.get(`/api/contact-get/${id}`, {headers: this.header});
  }

  getContactByStudentId(id): Observable<any> {
    return this.http.get(`/api/contact-getbystudentfk/${id}`, {headers: this.header});
  }

  getContacts(): Observable<any> {
    return this.http.get(`/api/contact-getall`, {headers: this.header});
  }
  
  editContact(contact): Observable<any> {
    return this.http.put(`/api/contact-update`, JSON.stringify(contact), {headers: this.header});
  }

  getCounty(): Observable<any> {
    return this.http.get(`/api/contact-getCounty`, {headers: this.header});
  }


}

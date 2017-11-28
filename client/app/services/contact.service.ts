import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getContactById(id): Observable<any> {
    return this.http.get(`/api/contact-get/${id}`).map(res => res.json());
  }

  getContactByStudentId(id): Observable<any> {
    return this.http.get(`/api/contact-getbystudentfk/${id}`).map(res => res.json());
  }

  getContacts(): Observable<any> {
    return this.http.get(`/api/contact-getall`).map(res => res.json());
  }

  addContact(contact): Observable<any> {
    return this.http.post('/api/contact-insert', JSON.stringify(contact), this.options);
  }

  deleteContact(contact): Observable<any> {
    return this.http.get(`/api/contact-delete/${contact.id}`, this.options);
  }

  addContactFromStudentId(id): Observable<any> {
    return this.http.get(`/api/contact-insert/${id}`, this.options);
  }

  editContact(contact): Observable<any> {
    return this.http.put(`/api/contact-update`, JSON.stringify(contact), this.options);
  }


}

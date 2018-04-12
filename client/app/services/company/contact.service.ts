import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyContactService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

  constructor(private http: HttpClient) { }


  //MYSQL

  getContactById(id): Observable<any> {
    return this.http.get(`/api/contacts-get/${id}`, {headers: this.header});
  }

  getContactByCompanyId(id): Observable<any> {
    return this.http.get(`/api/contacts-getbycompanyfk/${id}`, {headers: this.header});
  }

  getContacts(): Observable<any> {
    return this.http.get(`/api/contacts-getall`, {headers: this.header});
  }

  addContact(contact): Observable<any> {
    return this.http.post('/api/contacts-insert', JSON.stringify(contact), {headers: this.header});
  }

  deleteContact(contact): Observable<any> {
    return this.http.get(`/api/contacts-delete/${contact.id}`, {headers: this.header});
  }

  addContactFromCompanyId(id): Observable<any> {
    return this.http.get(`/api/contacts-insert/${id}`, {headers: this.header});
  }

  editContact(contact): Observable<any> {
    return this.http.put(`/api/contacts-update`, JSON.stringify(contact), {headers: this.header});
  }


}

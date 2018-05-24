import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyContactService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth'  });

  constructor(private http: HttpClient) { }


  //MYSQL

  getContactByCompanyId(id): Observable<any> {
    return this.http.get(`/api/contacts-getbycompanyfk/${id}`, {headers: this.header});
  }

  getContacts(): Observable<any> {
    return this.http.get(`/api/contacts-getall`, {headers: this.header});
  }

  addContactFromCompanyId(form): Observable<any> {
    return this.http.post(`/api/contacts-insert`, form, {headers: this.header});
  }

  editContact(contact): Observable<any> {
    return this.http.put(`/api/contacts-update`, JSON.stringify(contact), {headers: this.header});
  }


}

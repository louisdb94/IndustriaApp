import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminCompanycontactService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth'  });

  constructor(private http: HttpClient) { }


  //MYSQL

  insertContact(contact): Observable<any> {
    return this.http.post('/api/admin-companycontact-insert', JSON.stringify(contact), {headers: this.header});
  }

  getContacts(): Observable<any> {
    return this.http.get(`/api/admin-companycontact-getall`,{headers: this.header});
  }

  editContact(contact): Observable<any> {
    return this.http.put(`/api/admin-companycontact-update`, JSON.stringify(contact), {headers: this.header});
  }

}

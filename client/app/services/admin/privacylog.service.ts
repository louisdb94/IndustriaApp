import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PrivacylogService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth'  });

  constructor(private http: HttpClient) { }

  //MYSQL

  insertPrivacylog(privacylog): Observable<any> {
    return this.http.post('/api/privacylog-insert', JSON.stringify(privacylog), {headers: this.header});
  }

  deletePrivacylog(id): Observable<any> {
    return this.http.delete(`/api/privacylog-delete/${id}`, {headers: this.header});
  }

}

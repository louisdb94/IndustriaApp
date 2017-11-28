import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class VacatureService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getVacatureById(id): Observable<any> {
    return this.http.get(`/api/vacatures-get/${id}`).map(res => res.json());
  }

  getVacatures(): Observable<any> {
    return this.http.get(`/api/vacatures-getall`).map(res => res.json());
  }

  addVacature(vacature): Observable<any> {
    return this.http.post('/api/vacatures-insert', JSON.stringify(vacature), this.options);
  }

  deleteVacature(vacature): Observable<any> {
    return this.http.get(`/api/vacatures-delete/${vacature.id}`, this.options);
  }

  addVacatureFromCompanyId(id): Observable<any> {
    return this.http.get(`/api/vacatures-insert/${id}`, this.options);
  }


}

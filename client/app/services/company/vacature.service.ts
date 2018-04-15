import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class VacatureService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

  constructor(private http: HttpClient) { }


  //MYSQL

  getVacatureById(id): Observable<any> {
    return this.http.get(`/api/vacatures-get/${id}`,);
  }

  getVacatureByCompanyId(id): Observable<any> {
    return this.http.get(`/api/vacatures-getbycompany/${id}`, {headers: this.header});
  }

  getVacatures(): Observable<any> {
    return this.http.get(`/api/vacatures-getall`, {headers: this.header});
  }

  // addVacature(vacature): Observable<any> {
  //   return this.http.post('/api/vacatures-insert', JSON.stringify(vacature), {headers: this.header});
  // }

  deleteVacature(id): Observable<any> {
    return this.http.delete(`/api/vacatures-delete/${id}`, {headers: this.header});
  }

  // addVacatureFromCompanyId(id): Observable<any> {
  //   return this.http.get(`/api/vacatures-insert/${id}`, {headers: this.header});
  // }

  editVacature(vacature): Observable<any> {
    return this.http.put(`/api/vacatures-update`, JSON.stringify(vacature), {headers: this.header});
  }

  addVacatureForm(form): Observable<any> {
    return this.http.post('/api/vacatures-insertform', JSON.stringify(form), {headers: this.header});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private httpClient: HttpClient) { }


  //MYSQL

  getStudentByIdMysql(id): Observable<any> {
    return this.httpClient.get(`/api/students-get/${id}`,{headers: this.header});
  }

  getStudentsMysql(): Observable<any> {
    return this.httpClient.get(`/api/students-getall`, {headers: this.header});
  }

  getStudentsIdsMysql(): Observable<any> {
    return this.httpClient.get(`/api/students-getallid`,{headers: this.header});
  }

  addStudentMysql(student): Observable<any> {
    return this.httpClient.post('/api/students-insert', student, {headers: this.header});
  }

  addStudentFromUserId(id): Observable<any> {
    return this.httpClient.get(`/api/students-insert/${id}`, {headers: this.header});
  }

  getStudentByRnumberMysql(rnumber): Observable<any> {
    return this.httpClient.get(`/api/student-getbyrnumber/${rnumber}`, {headers: this.header});
  }

  editStudentMysql(student): Observable<any> {
    return this.httpClient.put(`/api/student-update`, JSON.stringify(student), {headers: this.header});
  }

}

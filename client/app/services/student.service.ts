import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  private h = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });


  constructor(private httpClient: HttpClient) { }



  getStudentByRnumber(rnumber): Observable<any> {
    return this.httpClient.get(`/api/user/${rnumber}`);
  }

  // editStudent(student): Observable<any> {
  //   return this.http.put(`/api/student/${student._id}`, JSON.stringify(student), this.options);
  // }
  //
  // deleteStudent(student): Observable<any> {
  //   return this.http.delete(`/api/cat/${student._id}`, this.options);
  // }
  //
  // deleteExperience(experience): Observable<any> {
  //   return this.http.delete(`/api/student/${experience}`, this.options);
  // }


  //MYSQL

  getStudentByIdMysql(id): Observable<any> {
    return this.httpClient.get(`/api/students-get/${id}`,{headers: this.h});
  }

  // getStudentsMysql(): Observable<any> {
  //   return this.http.get(`/api/students-getall`, this.options).map(res => res.json());
  // }

  getStudentsMysql(): Observable<any> {
    return this.httpClient.get(`/api/students-getall`, {headers: this.h});
  }

  getStudentsIdsMysql(): Observable<any> {
    return this.httpClient.get(`/api/students-getallid`,{headers: this.h});
  }

  addStudentMysql(student): Observable<any> {
    return this.httpClient.post('/api/students-insert', student, {headers: this.h});
  }

  addStudentFromUserId(id): Observable<any> {
    return this.httpClient.get(`/api/students-insert/${id}`, {headers: this.h});
  }

  getStudentByRnumberMysql(rnumber): Observable<any> {
    return this.httpClient.get(`/api/student-getbyrnumber/${rnumber}`, {headers: this.h});
  }

  editStudentMysql(student): Observable<any> {
    return this.httpClient.put(`/api/student-update`, JSON.stringify(student), {headers: this.h});
  }




}

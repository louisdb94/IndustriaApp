import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }

  getStudents(): Observable<any> {
    return this.http.get('/api/students').map(res => res.json());
  }

  countStudents(): Observable<any> {
    return this.http.get('/api/students/count').map(res => res.json());
  }

  addStudent(student): Observable<any> {
    return this.http.post('/api/student', JSON.stringify(student), this.options);
  }

  getStudent(student): Observable<any> {
    return this.http.get(`/api/student/${student._id}`).map(res => res.json());
  }

  getStudentById(id): Observable<any> {
    return this.http.get(`/api/student/${id}`).map(res => res.json());
  }

  getStudentByRnumber(rnumber): Observable<any> {
    console.log(rnumber);
    return this.http.get(`/api/user/${rnumber}`).map(res => res.json());
  }

  editStudent(student): Observable<any> {
    return this.http.put(`/api/student/${student._id}`, JSON.stringify(student), this.options);
  }

  deleteStudent(student): Observable<any> {
    return this.http.delete(`/api/cat/${student._id}`, this.options);
  }

  deleteExperience(experience): Observable<any> {
    return this.http.delete(`/api/student/${experience}`, this.options);
  }


  //MYSQL

  getStudentByIdMysql(id): Observable<any> {
    return this.http.get(`/api/students-get/${id}`).map(res => res.json());
  }

  getStudentsMysql(): Observable<any> {
    return this.http.get(`/api/students-getall`).map(res => res.json());
  }

  addStudentMysql(student): Observable<any> {
    return this.http.post('/api/students-insert', JSON.stringify(student), this.options);
  }

  addStudentFromUserIdMysql(user_id): Observable<any> {
    return this.http.post('/api/students-insertUserFk', JSON.stringify(user_id), this.options);
  }

  getStudentByRnumberMysql(rnumber): Observable<any> {
    console.log(rnumber);
    return this.http.get(`/api/student-getbyrnumber/${rnumber}`).map(res => res.json());
  }




}

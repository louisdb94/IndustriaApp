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

  addUpload(fileupload): Observable<any> {
    console.log("danny");
    return this.http.post('/api/upload', JSON.stringify(fileupload), this.options);
  }

  getStudent(student): Observable<any> {
    return this.http.get(`/api/student/${student._id}`).map(res => res.json());
  }

  getStudentById(id): Observable<any> {
    return this.http.get(`/api/student/${id}`).map(res => res.json());
  }

  editStudent(student): Observable<any> {
    return this.http.put(`/api/student/${student._id}`, JSON.stringify(student), this.options);
  }

  deleteStudent(student): Observable<any> {
    return this.http.delete(`/api/cat/${student._id}`, this.options);
  }

}

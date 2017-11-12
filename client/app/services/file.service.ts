import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }

  // CV

  addUpload(fileupload): Observable<any> {
    console.log("danny");
    return this.http.post('/api/upload', JSON.stringify(fileupload), this.options);
  }

  downloadCv(cv): Observable<any> {
    return this.http.get(`/api/download/${cv._id}`);
  }

  addCv(cv):Observable<any>{
    return this.http.post('/api/cv', JSON.stringify(cv), this.options);
  }

  getCvFromStudent(id):Observable<any>{
    return this.http.get(`/api/cv/${id}`).map(res => res.json());
  }

  removeCv(cv):Observable<any>{
    return this.http.delete(`/api/cv/${cv._id}`, this.options);
  }

  // IMAGE


  addImage(image):Observable<any>{
    return this.http.post('/api/image', JSON.stringify(image), this.options);
  }

  getImFromStudent(id):Observable<any>{
    return this.http.get(`/api/image/${id}`).map(res => res.json());
  }

  removeImage(image):Observable<any>{
    return this.http.delete(`/api/image/${image._id}`, this.options);
  }

  downloadImage(id): Observable<any> {
    return this.http.get(`/api/downloadImage/${id}`);
  }
}

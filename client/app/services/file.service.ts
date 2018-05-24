import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });
  private options = new RequestOptions({ headers: this.headers });

  private headersFile = new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'x-industria-auth' : 'auth' });

  constructor(private http: Http, private httpClient: HttpClient) { }

  uploadImage(image):Observable<any>{
    return this.http.post('/api/image/upload', image);
  }

  uploadImageCompany(image):Observable<any>{
    return this.http.post('/api/image/upload-company', image);
  }

  downloadImage(id): Observable<any> {
    return this.http.get(`/api/downloadImage/${id}`);
  }

  downloadImageCompany(id): Observable<any> {
    return this.http.get(`/api/downloadImage-company/${id}`);
  }

  addCv(cv):Observable<any>{
    return this.http.post('/api/cv-add', JSON.stringify(cv), this.options);
  }

  removeCv(cv):Observable<any>{
    return this.http.delete(`/api/cv-delete/${cv.id}`, cv);
  }

  getCvFromStudent(id):Observable<any>{
    return this.http.get(`/api/cv/${id}`).map(res => res.json());
  }

  uploadCv(formData):Observable<any>{
    return this.http.post('/api/cv/upload', formData);
  }
}

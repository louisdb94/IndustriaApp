import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguageService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });



  constructor(private http: Http) { }


  //MYSQL

  getLanguageById(id): Observable<any> {
    return this.http.get(`/api/language-get/${id}`).map(res => res.json());
  }

  getLanguages(): Observable<any> {
    return this.http.get(`/api/language-getall`).map(res => res.json());
  }

  addLanguage(language): Observable<any> {
    return this.http.post('/api/language-insert', JSON.stringify(language), this.options);
  }

  deleteLanguage(language): Observable<any> {
    return this.http.get(`/api/experience-delete/${language.id}`, this.options);
  }

  addLanguageFromStudentId(id): Observable<any> {
    return this.http.get(`/api/language-insert/${id}`, this.options);
  }


}

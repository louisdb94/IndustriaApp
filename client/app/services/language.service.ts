import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguageService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getLanguageById(id): Observable<any> {
    return this.http.get(`/api/language-get/${id}`, {headers: this.header});
  }

  getLanguageByStudentId(id): Observable<any> {
    return this.http.get(`/api/language-getbystudentfk/${id}`, {headers: this.header});
  }

  getLanguages(): Observable<any> {
    return this.http.get(`/api/language-getall`, {headers: this.header});
  }

  getLanguagesDistinct(): Observable<any> {
    return this.http.get(`/api/language-getalldistinct`, {headers: this.header});
  }
  addLanguage(language): Observable<any> {
    return this.http.post('/api/language-insert', JSON.stringify(language), {headers: this.header});
  }

  deleteLanguage(language): Observable<any> {
    return this.http.get(`/api/experience-delete/${language.id}`, {headers: this.header});
  }

  addLanguageFromStudentId(id): Observable<any> {
    return this.http.get(`/api/language-insert/${id}`, {headers: this.header});
  }

  editLanguage(language): Observable<any> {
    return this.http.put(`/api/language-update`, JSON.stringify(language), {headers: this.header});
  }

  getFkbyLang(lang): Observable<any> {
    return this.http.get(`api/language-getfkbylang/${lang}`, {headers: this.header});
  }


}

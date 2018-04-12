import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ExperienceService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });

  constructor(private http: HttpClient) { }

  //MYSQL

  getExperienceById(id): Observable<any> {
    return this.http.get(`/api/experiences-get/${id}`, {headers: this.header});
  }

  getExperiences(): Observable<any> {
    return this.http.get(`/api/experience-getall`, {headers: this.header});
  }

  addExperience(education): Observable<any> {
    return this.http.post('/api/experience-insert', JSON.stringify(education), {headers: this.header});
  }

  deleteExperience(id): Observable<any> {
    return this.http.delete(`/api/experiences-delete/${id}`, {headers: this.header});
  }

  addExperienceFromStudentId(id): Observable<any> {
    return this.http.get(`/api/experience-insert/${id}`, {headers: this.header});
  }

  addExperienceForm(form): Observable<any> {
    return this.http.post('/api/experience-insertform', JSON.stringify(form), {headers: this.header});
  }

  editExperience(experience): Observable<any> {
    return this.http.put(`/api/experience-update`, JSON.stringify(experience), {headers: this.header});
  }

}

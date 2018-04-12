import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserService } from '../services/user.service';
import { StudentService} from '../services/student.service';
import { CompanyService} from '../services/company/company.service';

@Injectable()
export class MailService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { id: '', email: '', rnumber: '', password: ''};

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'x-industria-auth' : 'auth' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private userService: UserService,
              private router: Router,
              private studentService: StudentService,
              private companyService: CompanyService,
              private http: Http) {
    const token_mail = localStorage.getItem('token_mail');
    if (token_mail) {
      const decodedUser = this.decodeUserFromToken(token_mail);
      this.setCurrentUser(decodedUser);
    }
  }


  sendMail(credentials): Observable<any> {
    return this.http.get(`/api/sendmail/${credentials}`, this.options);
  }

  nodemailer(email) {

    return this.sendMail(email).map(res => res.json()).map(
      res => {
        localStorage.setItem('token_mail', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      },
      error => { console.log("fout in mailservice nodemailer", error)}
    );
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser.id = decodedUser.id;
    this.currentUser.email = decodedUser.email;
    this.currentUser.rnumber = decodedUser.rnumber;
    this.currentUser.password = '';

    delete decodedUser.role;
  }

}

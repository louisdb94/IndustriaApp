import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';
import { StudentService} from '../services/student.service';
import { CompanyService} from '../services/company/company.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { id: 0, email: '', rnumber: '', role: '', studentId: 0 , companyId: 0, admin: ''};

  constructor(private userService: UserService,
              private router: Router,
              private studentService: StudentService,
              private companyService: CompanyService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  loginshibb(rnumber){
    this.currentUser.rnumber = rnumber;
    this.currentUser.email = rnumber + "@kuleuven.be";
    this.studentService.getStudentByRnumberMysql(rnumber).subscribe(
      data => {console.log(data)},
      error => {console.log(error)}
    );
  }

  login(emailAndPassword) {
    return this.userService.loginMysql(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { id: 0, email: '', rnumber: '', role: '', studentId: 0 , companyId: 0, admin:''};
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser.id = decodedUser[0].id;
    this.currentUser.rnumber = decodedUser[0].rnumber;
    this.currentUser.role = decodedUser[0].role;
    this.currentUser.admin = decodedUser[0].admin;
    this.currentUser.email = decodedUser[0].email;
    if(decodedUser[0].role === 'Student'){
    this.studentService.getStudentByRnumberMysql(decodedUser[0].rnumber).subscribe(
      data => {this.currentUser.studentId = data[0].id},
      error => console.log(error)
    );
    }
    if(decodedUser[0].role === 'Company'){
    this.companyService.getCompanyByEmailMysql(decodedUser[0].email).subscribe(
      data => {this.currentUser.companyId = data[0].id},
      error => console.log(error)
    );
    }

    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;

    delete decodedUser.role;
  }

}

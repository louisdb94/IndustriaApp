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
      if(decodedUser.role == "Company"){
        this.setCurrentUser(decodedUser);
      }
      else{
        this.setCurrentUser(decodedUser);
      }
    }
  }

  login(emailAndPassword) {
    return this.userService.loginMysql(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      },
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
    this.currentUser.id = decodedUser.id;
    this.currentUser.rnumber = decodedUser.rnumber;
    this.currentUser.role = decodedUser.role;
    this.currentUser.admin = decodedUser.admin;
    this.currentUser.email = decodedUser.email;
    if(decodedUser.role === 'Student'){
    this.studentService.getStudentByRnumberMysql(decodedUser.rnumber).subscribe(
      data => {this.currentUser.studentId = data[0].id},
      error => console.log(error)
    );
    }
    if(decodedUser.role === 'Company'){
    this.companyService.getCompanyByEmailMysql(decodedUser.email).subscribe(
      data => {this.currentUser.companyId = data[0].id},
      error => console.log(error)
    );
    }
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

  loginStudent(token) {
    if(this.currentUser.rnumber == '') {
      localStorage.setItem('token', token);
      const decodedUserStudent = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUserStudent);
    }
  }
}

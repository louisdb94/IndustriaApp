import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from './auth.service';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthGuardAdmin implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  id;
  constructor(  public auth: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const id = route.data.id;

    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken(token).user;

    if (tokenPayload.role == expectedRole || this.auth.currentUser.studentId == this.id) {
      // this.router.navigate(['login']);
      return true;
    }else{
      this.router.navigate(['notfound']);
      return false;
    }
  }

}

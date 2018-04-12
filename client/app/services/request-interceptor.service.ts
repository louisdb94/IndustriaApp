import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent,
    HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Injectable, Injector, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    private authService: AuthService;

    constructor(private injector: Injector, private zone: NgZone, private router: Router) {



    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token,
                'Content-Type': req.headers.get('Content-Type')
            }
        });
    }
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
        HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

          console.log("intercept", req.headers);
        this.authService = this.injector.get(AuthService);
        if (!req.headers.has('x-industria-auth')) {

            return next.handle(req);
        }

        const token = this.authService.getToken();
        console.log("token", token);
        if(token === null){
          this.logoutUser();
          return Observable.throw("no token found");
        }

        return next.handle(this.addToken(req, token))
            .catch((error) => {
                console.log("catch error", error);
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 || error.status === 403) {
                        return this.logoutUser();
                    }
                } else {
                    return Observable.throw(error);
                }
            });
    }

    private handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return this.logoutUser();
        }
        return Observable.throw(error);
    }

    private logoutUser() {
        this.router = this.injector.get(Router);
        this.authService = this.injector.get(AuthService);
        this.authService.logout();
        this.router.navigate(["/"]);
        return Observable.empty();
    }
}

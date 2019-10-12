import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler){

        const newReq = this.appendAuthorizationHeader(req);

        return next.handle(newReq)
            .pipe(
                catchError( (error: any) => {
                    return this.catchResponseError(error);
                })
            );
    }

    private appendAuthorizationHeader(req: HttpRequest<any>){
        let token = localStorage.getItem('token');
        if (token){
            return req.clone({
                setHeaders: { Authorization: token }
            });
        }
        else {
            return req;
        }

    }

    private catchResponseError(error: any){
        if (error instanceof HttpErrorResponse){
            if (error.status === 401) {
                this.authService.logout();
                this.router.navigateByUrl('/auth/login');
            }
        }
        return throwError(error);
    }
}
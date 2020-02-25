import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (typeof localStorage.ngx_token !== 'undefined') {
            const headers = new HttpHeaders()
                .set('Authorization', 'Bearer ' + JSON.parse(localStorage.ngx_token));
            req = req.clone({ headers });

        }
        return next.handle(req);
    }
}

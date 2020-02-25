import { Injectable } from '@angular/core';
import { Request } from '../interfaces/request.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as queryString from 'query-string';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
// import { NgProgress } from 'ngx-progressbar';
declare const $: any;

@Injectable()
export class RequestService implements Request {

    private urlToRedirect: string;

    constructor(public http: HttpClient, private router: Router) {
        this.urlToRedirect = 'auth/sign-in';
    }

    errorHandler(error: HttpErrorResponse) {
        console.log(error);
        switch (error.status) {
            case 401:
                this.router.navigate([this.urlToRedirect]);
                break;
            case 403:
                this.notification('danger', error.error.message);
                break;
            default: {
                let errorMsg = '';
                for (var i in error['error']['errors']) {
                    const obj = error['error']['errors'][i];
                    errorMsg += obj + ' ';
                }
                this.notification('danger', errorMsg);
            }
        }
    }

    notification(type, message) {
        $.notify({
            icon: 'pe-7s-bell',
            message: message
        }, {
                type: type,
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
    }
    /**
     *
     * @param {string} url
     * @param {Object} body
     * @returns {Observable<Object>}
     */
    public get(url: string, body: Object = null) {
        // this.ngProgress.start();
        if (body !== null) {
            if (Object.keys(body).length > 0) {
                url += '?' + queryString.stringify(body);
            }
        }
        return this.http.get(url)
            .pipe(tap(() => {
                // this.ngProgress.done();

            }, error => {
                this.errorHandler(error);
            }));
    }

    /**
     *
     * @param url
     * @param credentials
     * @returns {Observable<ArrayBuffer>}
     */
    public post(url: string, credentials: any) {
        // this.ngProgress.start();
        return this.http.post(url, credentials)
            .pipe(tap(() => {
                // this.ngProgress.done();

            }, error => {
                this.errorHandler(error);
            }));
    }

    /**
     *
     * @param {string} url
     * @param credentials
     * @returns {Observable<Object>}
     */
    public put(url: string, credentials: any) {
        // this.ngProgress.start();

        return this.http.put(url, credentials)
            .pipe(tap(() => {
                // this.ngProgress.done();

            }, error => {
                this.errorHandler(error);
            }));

    }

    /**
     *
     * @param {string} url
     * @returns {Observable<Object>}
     */
    public delete(url: string) {
        // this.ngProgress.start();

        return this.http.delete(url)
            .pipe(tap(() => {
                // this.ngProgress.done();

            }, error => {
                this.errorHandler(error);
            }));
    }
}

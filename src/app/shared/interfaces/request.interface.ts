import {Observable} from 'rxjs/Observable';

export declare interface Request {

    post(url: string, data: Object): Observable<any>;

    get(url: string, data: Object): Observable<any>;

    put(url: string, data: Object): Observable<any>;

    delete(url: string): Observable<any>;
}

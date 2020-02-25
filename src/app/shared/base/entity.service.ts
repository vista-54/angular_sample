import { ConstantHelperService } from './constant-helper.service';
import { Entity } from '../interfaces/entity.interface';
import { RequestService } from '../services/request.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable()

export class EntityService extends ConstantHelperService implements Entity {
    constructor(public request: RequestService) {
        super();
    }


    get(id: number = null, data: Object = null) {
        let url = this.url('index');
        if (id != null) {
            url += '/' + id;
        }
        return this.request.get(url, data);
        // .pipe(tap(() => { }, err => { this.notification('danger', err.error.message); }));
    }

    /**
     *
     * @param data
     * @returns {Observable<Object>}
     */

    create(data: any) {
        const url = this.url('create');
        return this.request.post(url, data)
            .pipe(tap(() => {
                const msg = this.msg('create');
                this.notification('success', msg);
            },
                err => {
                    this.incorrectValidationErrors(err.error.error);
                }));
    }

    edit(data: any) {
        let url = this.url('update');
        url += '/' + data.id;
        return this.request.put(url, data)
            .pipe(tap(() => {
                const msg = this.msg('update');
                this.notification('success', msg);
            },
                err => {
                    this.incorrectValidationErrors(err.error.error);
                }));
    }

    deleteOnce(data) {
        let url = this.url('index');
        url += '/' + data.id;
        return this.request.delete(url)
            .pipe(tap(() => {
                const msg = this.msg('delete');
                this.notification('success', msg);
            },
                err => {
                    this.incorrectValidationErrors(err.error.error);
                }));
    }

    /**
     *
     * @param data
     * @returns {Observable<any>}
     */
    delete(data: any) {
        let url = this.url('delete');
        // url += '/' + data.id;
        return this.request.post(url, data)
            .pipe(tap(() => {
                const msg = this.msg('delete');
                this.notification('success', msg);
            },
                err => {
                    this.incorrectValidationErrors(err.error.error);
                }));
    }


    update(data: any) {
        let url = this.url('update');
        url += '/' + data.id;
        return this.request.put(url, data)
            .pipe(tap(() => {
                const msg = this.msg('update');
                this.notification('success', msg);
            },
                err => {
                    this.incorrectValidationErrors(err.error.error);
                }
            ));

    }


    public incorrectValidationErrors(errors: Array<String>) {
        let errorMsg = '';
        for (var i in errors) {
            const obj = errors[i];
            errorMsg += obj + ' ';
        }
        this.notification('error', errorMsg);
    }

}

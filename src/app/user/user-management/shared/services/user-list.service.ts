import { Injectable } from "@angular/core";
import { EntityService } from "src/app/shared/base/entity.service";
import { RequestService } from "src/app/shared/services/request.service";
import { tap } from "rxjs/operators";
import { Resolve } from "@angular/router";

@Injectable()
export class UserListService extends EntityService implements Resolve<any> {

    constructor(public request: RequestService) {
        super(request);
        this.service_name = 'user';
    }

    resolve() {
        return this.get();
    }

    getUser(id: number = null, params?: object) {
        let url = this.url('store');
        if (id) {
            url += '/' + id;
        }
        return this.request.get(url, params);
    }

    updateUser(id: number, data: object) {
        let url = this.url('update');
        url += '/' + id;
        return this.request.put(url, data);
    }

    getRole() {
        let url = this.url('role');
        return this.request.get(url);
    }

    invite(data: object) {
        let url = this.url('invite');
        return this.request.post(url, data).pipe(
            tap(res => {
                if (res['status']) {
                    const msg = this.msg('invite');
                    this.notification('success', msg);
                }
            }, err => {
                this.incorrectValidationErrors(err.error.error);
            })
        );
    }
}
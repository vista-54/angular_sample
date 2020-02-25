import { Injectable } from "@angular/core";
import { EntityService } from "../../../../shared/base/entity.service";
import { RequestService } from "../../../../shared/services/request.service";
import { tap } from "rxjs/internal/operators";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class ProductManagementService extends EntityService implements Resolve<any> {

    constructor(public request: RequestService) {
        super(request);
        this.service_name = 'product';
    }

    resolve() {
        return this.get();
    }

    getProvider(id: number = null, data) {
        let url = this.url('provider');
        return this.request.get(url, data);
    }

    getCategory(id: number = null, data) {
        let url = this.url('category');
        return this.request.get(url, data);
    }

    getFieldsByCategory(id: number, categoriesArr: Array<any>) {
        for (let i = 0; i < categoriesArr.length; i++) {
            if (categoriesArr[i].id === id) {
                return categoriesArr[i].fields;
            }
        }
        return false;
    }

    postFile(data: Object) {
        const url = this.url('post_file');
        const fd = new FormData();
        for (const i in data) {
            fd.append(i, data[i]);
        }
        return this.request.post(url, fd)
            .pipe(tap(() => {
                const msg = this.msg('import');
                this.notification('success', msg);
            },
                err => {
                    this.incorrectValidationErrors(err.error.error);
                }));
    }

    updateProduct(id: number, data: object) {
        let url = this.url('update');
        url += '/' + id;
        return this.request.put(url, data);
    }
}
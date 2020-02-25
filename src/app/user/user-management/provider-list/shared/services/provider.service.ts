import { RequestService } from "../../../../../shared/services/request.service";
import { EntityService } from "../../../../../shared/base/entity.service";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

@Injectable()
export class ProviderService extends EntityService implements Resolve<any> {

    constructor(public request: RequestService) {
        super(request);
        this.service_name = 'provider';
    }

    resolve() {
        return this.get();
    }

    getAll() {
        let url = this.url('index');
        return this.request.get(url);
    }

    getCategories() {
        let url = this.url('categories');
        return this.request.get(url);
    }

}
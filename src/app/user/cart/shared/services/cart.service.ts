import { Injectable } from "@angular/core";
import { EntityService } from "src/app/shared/base/entity.service";
import { Resolve } from "@angular/router";
import { RequestService } from "src/app/shared/services/request.service";

@Injectable()
export class CartService extends EntityService implements Resolve<any> {

    constructor(public request: RequestService) {
        super(request);
        this.service_name = 'cart';
    }

    resolve() {
        return this.getAll();
    }

    getAll() {
        let url = this.url('index');
        return this.request.get(url);
    }
}
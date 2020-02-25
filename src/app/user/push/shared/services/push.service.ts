import {Injectable} from "@angular/core";
import {EntityService} from "../../../../shared/base/entity.service";
import {RequestService} from "../../../../shared/services/request.service";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class PushService extends EntityService {

    constructor(public request: RequestService) {
        super(request);
        this.service_name = 'push';
    }

    setNot(data: object) {
        let url = this.url('push');
        return this.request.post(url, data).pipe(
            tap(res => {
                if (res['status']) {
                    const msg = this.msg('push');
                    this.notification('success', msg);
                } else {
                    this.notification('danger', res['error']);
                }
            }, err => {
                this.notification('danger', err.error.error);
            })
        );
    }
}
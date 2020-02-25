import { Injectable } from '@angular/core';
import { APP_URL } from '../constants/app.url';
import { ConstantHelper } from '../interfaces/constant-helper.interface';
import { APP_MSG } from '../constants/app.messages';

declare const $: any;

@Injectable()
export class ConstantHelperService implements ConstantHelper {

    service_name: string;

    constructor() {

    }

    /**
     * Get url from COMMON URL FILE by action and service name
     * @param action
     * @returns {any}
     */
    url(action) {
        if (this.service_name in APP_URL) {
            if (action in APP_URL[this.service_name]) {
                return APP_URL[this.service_name][action];
            }
        }
        return false;
    }

    /**
     * Get url from COMMON MSG FILE by action and service name
     * @param action
     * @returns {any}
     */
    msg(action) {
        if (this.service_name in APP_MSG) {
            if (action in APP_MSG[this.service_name]) {
                return APP_MSG[this.service_name][action];
            }
        }
        return false;
    }

    /**
     * showing notification after create/update actions
     * @param type
     * @param message
     */
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
}

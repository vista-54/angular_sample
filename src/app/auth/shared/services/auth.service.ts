import {Injectable} from "@angular/core";
import {EntityService} from "src/app/shared/base/entity.service";
import {RequestService} from "src/app/shared/services/request.service";
import {tap} from "rxjs/operators";
import {LocalStorageService} from "ngx-store";
import {Router} from "@angular/router";

@Injectable()
export class AuthService extends EntityService {

    constructor(public request: RequestService, public localStorageService: LocalStorageService, public router: Router) {
        super(request);
        this.service_name = 'auth';
    }

    signIn(credentials, autologin) {
        const url = this.url('login');
        return this.request.post(url, credentials)
            .pipe(tap((data) => {
                    if (data['status']) {
                        const msg = this.msg('login_win');
                        this.notification('success', msg);
                        this.localStorageService.set('autologin', autologin);
                        this.router.navigate(['user']);
                    } else {
                        let errorMsg = '';
                        if (typeof data['error'] !== 'string') {

                            for (let i in data['error']) {
                                const obj = data['error'][i];
                                errorMsg += obj + ' ';
                            }
                        } else {
                            errorMsg += data['error'] + ' ';
                        }

                        this.notification('danger', errorMsg);
                    }

                },
                err => {
                    this.notification('danger', err.error.error);
                }));
    }

    forgot(credentials) {
        const url = this.url('forgot');
        return this.request.post(url, credentials)
            .pipe(tap(res => {
                if (res['status']) {
                    this.router.navigate(['auth/confirm'], {queryParams: {email: credentials['email']}});
                    this.notification('success', 'Вам на почту было отправлено сообщение с кодом');
                } else {
                    this.notification('danger', res['error']);
                }
            }, err => {
                const msg = this.msg('forgot_error');
                this.notification('danger', err.error.error);
            }));
    }

    confirm(credentials) {
        const url = this.url('confirm');
        return this.request.post(url, credentials)
            .pipe(tap(res => {
                if (res['status']) {
                    this.router.navigate(['auth/change'], {queryParams: {code: credentials['code']}});

                } else {
                    this.notification('danger', res['error']);
                }

            }, err => {
                this.notification('danger', err.error.error);
            }));
    }

    change(credentials) {
        const url = this.url('change');
        if (credentials['password'] === credentials['passwordConfirm']) {
            return this.request.post(url, credentials)
                .pipe(tap(res => {
                    if (res['status']) {
                        this.router.navigate(['auth/sing-in']);
                        this.notification('success', 'Пароль успешно обновлен');
                    } else {
                        this.notification('danger', res['error']);
                    }
                }, err => {
                    this.notification('danger', err.error.error);

                }));
        } else {
            const msg = this.msg('change_error');
            this.notification('danger', msg);
        }
    }

}



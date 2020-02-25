import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-store';


declare interface SignInData {
    email: string;
    password: string;
}

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../auth.component.scss']
})

export class SignInComponent implements OnInit {

    public userData: SignInData;
    public autologin: boolean;

    constructor(private auth: AuthService, private router: Router, public localStorageService: LocalStorageService) {
        this.userData = {email: '', password: ''};
    }

    ngOnInit() {
        console.log('sign in is loaded');
        if (this.localStorageService.get('autologin')) {
            this.router.navigate(['user']);
        }
    }

    signIn() {
        console.log(this.userData);
        this.auth.signIn(this.userData, this.autologin)
            .subscribe(data => {
                if (data['status']) {
                    this.localStorageService.set('token', data['data']['token']);
                    this.localStorageService.set('user', data['data']['user']);
                }
            });
    }

}

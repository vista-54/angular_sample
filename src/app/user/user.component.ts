import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    private logged: boolean;
    public user = {
        name: '',
        surname: '',
        role: {
            name: '',
            id: 0
        }
    };

    constructor(private router: Router, private localStorageService: LocalStorageService) {

        this.logged = this.localStorageService.get('token');
        this.user = this.localStorageService.get('user');
    }

    ngOnInit() {
        console.log('user component');

        if (!this.logged) {
            this.router.navigate(['auth/sign-in']);
        }
    }

    logout() {
        this.localStorageService.clear('all');
        this.router.navigate(['auth/sign-in']);
    }
}

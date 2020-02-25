import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "ngx-store";
import { ROLES } from "../constants/roles";


@Injectable()
export class ProviderGuard implements CanActivate {

    public user: object = {};

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService) {
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.user = this.localStorageService.get('user');
        if (this.user['role_id'] !== ROLES.Admin) {
            this.router.navigate(['/user/product-management/product-list']);
            return false;
        } else {
            return true;
        }

    }
}
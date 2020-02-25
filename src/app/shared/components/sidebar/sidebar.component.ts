import {Component, OnInit} from "@angular/core";
import {ROLES} from "../../constants/roles";
import {LocalStorageService} from "ngx-store";
import {Router} from "@angular/router";

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    access: Array<number>;
}

export const ROUTES: RouteInfo[] = [
    {path: 'user-management', title: 'Пользователи', icon: 'pe-7s-user', class: '', access: [ROLES.Admin]},
    {
        path: 'product-management',
        title: 'Товары',
        icon: 'pe-7s-note2',
        class: '',
        access: [ROLES.Admin, ROLES.Provider]
    },
    {path: 'push', title: 'Уведомления', icon: 'pe-7s-mail', class: '', access: [ROLES.Admin]},
    {path: 'cart', title: 'Заказы', icon: 'pe-7s-cart', class: '', access: [ROLES.Admin, ROLES.Provider]},
    {path: 'about', title: 'О нас', icon: 'pe-7s-info', class: '', access: [ROLES.Admin]},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    menuItems: any[];
    avatar: string;
    user: any;
    user_info: string;
    private popup: any;
    private popupVisible: boolean;
    private toggleButton: any;

    constructor(public router: Router,
                public localStorageService: LocalStorageService) {
        this.popupVisible = false;
        this.user = localStorageService.get('user');
        this.user_info = `${this.user.name} ${this.user.surname} (${this.user.role.name})`;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => {
            return menuItem.access.indexOf(this.user.role_id) !== -1;
        });
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    logout() {
        this.localStorageService.clear();
        this.router.navigate(['auth/sign-in']);
    }
}

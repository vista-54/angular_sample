import { Component } from "@angular/core";
import { LocalStorageService } from "ngx-store";
import { ROLES } from "src/app/shared/constants/roles";

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

    public user: any;
    public menuItems: any;
    public tabsInfo: any[] = [
        {
            title: 'Список пользователей',
            url: './user-list',
            access: [ROLES.Admin]
        },
        {
            title: 'Список поставщиков',
            url: './provider-list',
            access: [ROLES.Admin]
        },
        {
            title: 'Список специализаций',
            url: './specialization-list',
            access: [ROLES.Admin]
        }
    ];

    constructor(public localStorageService: LocalStorageService) {
        this.user = localStorageService.get('user');
        this.menuItems = this.tabsInfo.filter(menuItem => {
            return menuItem.access.indexOf(this.user.role_id) !== -1;
        });
    }



}
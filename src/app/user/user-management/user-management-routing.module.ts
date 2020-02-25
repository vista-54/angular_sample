import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProviderListComponent } from "./provider-list/provider-list.component";
import { ProviderService } from "./provider-list/shared/services/provider.service";
import { UserListService } from './shared/services/user-list.service';
import { SpecializationService } from './specialization/shared/services/specialization.service';
import { SpecializationComponent } from './specialization/specialization.component';


const routes: Routes = [
    {
        path: '', component: UserManagementComponent,
        children: [
            { path: '', redirectTo: 'user-list', pathMatch: 'full' },
            { path: 'user-list', component: UserListComponent, resolve: { data: UserListService } },
            { path: 'provider-list', component: ProviderListComponent, resolve: { data: ProviderService } },
            { path: 'specialization-list', component: SpecializationComponent, resolve: { data: SpecializationService } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserManagementeRoutingModule {
    constructor() {
        console.log('user routing module');
    }
}

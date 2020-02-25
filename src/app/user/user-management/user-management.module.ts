import { NgModule } from '@angular/core';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListService } from './shared/services/user-list.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementeRoutingModule } from './user-management-routing.module';
import { OwlCheckBoxModule, OwlTooltipModule } from 'owl-ng';
import { ProviderService } from "./provider-list/shared/services/provider.service";
import { ProviderListComponent } from './provider-list/provider-list.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { SpecializationService } from './specialization/shared/services/specialization.service';

@NgModule({
    imports: [
        NgxSelectModule,
        SharedModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        UserManagementeRoutingModule,
        OwlCheckBoxModule,
        OwlTooltipModule
    ],
    declarations: [
        UserManagementComponent,
        UserListComponent,
        ProviderListComponent,
        SpecializationComponent
    ],
    providers: [
        UserListService,
        ProviderService,
        SpecializationService
    ],
    bootstrap: []
})
export class UserManagementModule {

}
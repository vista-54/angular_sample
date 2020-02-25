import { NgModule } from '@angular/core';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlCheckBoxModule } from 'owl-ng';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManagementService } from './shared/services/product-management.service';
import { OwlAccordionModule } from 'owl-ng';
import { ModalSelectComponent } from './shared/component/modal-select/modal-select.component';
import { ModalProductService } from './shared/component/modal-select/shared/modal-product.service';

@NgModule({
    imports: [
        NgxSelectModule,
        SharedModule,
        ProductManagementRoutingModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        OwlCheckBoxModule,
        OwlAccordionModule
    ],
    declarations: [
        ProductManagementComponent,
        ProductListComponent,
        ModalSelectComponent
    ],
    providers: [
        ProductManagementService,
        ModalProductService
    ],
    entryComponents: [ModalSelectComponent]
})
export class ProductManagementModule {

}
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CartService } from "./shared/services/cart.service";
import { CartComponent } from "./cart.component";
import { ModalModule, PaginationModule } from "ngx-bootstrap";
import { OwlAccordionModule } from "owl-ng";

@NgModule({
    imports: [
        SharedModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        OwlAccordionModule
    ],
    declarations: [CartComponent],
    providers: [CartService]
})
export class CartModule { }
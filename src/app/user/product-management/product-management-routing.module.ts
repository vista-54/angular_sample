import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductManagementComponent } from "./product-management.component";
import { ProductManagementService } from './shared/services/product-management.service';

const routes: Routes = [
    {
        path: '', component: ProductManagementComponent,
        children: [
            { path: '', redirectTo: 'product-list', pathMatch: 'full' },
            {
                path: 'product-list', component: ProductListComponent,
                resolve: { product: ProductManagementService }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductManagementRoutingModule {
}

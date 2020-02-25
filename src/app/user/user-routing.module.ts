import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { PushComponent } from './push/push.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/shared/services/cart.service';
import { ProviderGuard } from '../shared/guard/provider.guard';
import { AboutComponent } from './about/about.component';
import { AboutService } from './about/shared/about.service';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'user-management', pathMatch: 'full' },
            { path: 'user-management', loadChildren: './user-management/user-management.module#UserManagementModule', canActivate: [ProviderGuard] },
            { path: 'product-management', loadChildren: './product-management/product-management.module#ProductManagementModule' },
            { path: 'push', component: PushComponent },
            { path: 'cart', component: CartComponent, resolve: { cart: CartService } },
            { path: 'about', component: AboutComponent, resolve: { data: AboutService } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}

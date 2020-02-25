import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DataTitleService } from '../shared/providers/data-title.service';
import { PushService } from "./push/shared/services/push.service";
import { PushComponent } from "./push/push.component";
import { CartModule } from './cart/cart.module';
import { ProviderGuard } from '../shared/guard/provider.guard';
import { AboutComponent } from './about/about.component';
import { AboutService } from './about/shared/about.service';

@NgModule({
    imports: [
        UserRoutingModule,
        SharedModule,
        CartModule
    ],
    declarations: [
        UserComponent,
        PushComponent,
        AboutComponent,
    ],
    providers: [
        DataTitleService,
        AboutService,
        PushService,
        ProviderGuard
    ],
})
export class UserModule {
}

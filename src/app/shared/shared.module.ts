import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestService} from "./services/request.service";
import {EntityService} from "./base/entity.service";
import {ConstantHelperService} from "./base/constant-helper.service";
import {LocalStorageService} from "ngx-store";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {AuthenticationInterceptor} from "./services/authentication.interceptor";
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {OwlTooltipModule} from 'owl-ng';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        HttpClientModule,
        NgProgressModule.forRoot({
            spinnerPosition: 'left',
            color: 'rgb(9, 41, 91)',
            thick: false,
            spinner: false,
            speed: 200,
            min: 0.15,
            max: 1
        }),
        NgProgressHttpModule.forRoot(),
        OwlTooltipModule
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
    ],
    providers: [
        RequestService,
        EntityService,
        ConstantHelperService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        LocalStorageService,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        HttpClientModule,
        NavbarComponent,
        SidebarComponent,
        NgProgressModule,
        NgProgressHttpModule,
    ]
})
export class SharedModule {
}

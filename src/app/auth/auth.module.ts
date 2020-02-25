import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing';
import {AuthService} from './shared/services/auth.service';
import {FormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule],
    declarations: [
        AuthComponent,
        SignInComponent,
        ForgotPasswordComponent,
        ConfirmCodeComponent,
        ChangeComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {
    constructor() {
        console.log('Auth module is loaded');
    }
}

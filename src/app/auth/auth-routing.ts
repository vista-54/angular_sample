import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangeComponent } from './change/change.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

const routes: Routes = [

    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'confirm',
        component: ConfirmCodeComponent
    },
    {
        path: 'change',
        component: ChangeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class AuthRoutingModule {
    constructor() {
        console.log('auth routing is loaded');
    }
}

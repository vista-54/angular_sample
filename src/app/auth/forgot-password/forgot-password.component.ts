import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

declare interface UserData {
  email: string;
}


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../auth.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public userData: UserData;

  constructor(public service: AuthService) {
    this.userData = { email: '' };
  }

  ngOnInit() {
    console.log('Sign Up component is loaded');
  }

  forgot() {
    this.service.forgot(this.userData).subscribe();
  }
}

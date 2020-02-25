import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

declare interface UserData {
  email: string;
  code: string;
}

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss', '../auth.component.scss']
})
export class ConfirmCodeComponent implements OnInit {


  public userData: UserData;

  constructor(
    public service: AuthService,
    public route: ActivatedRoute) {
    this.userData = { email: '', code: '' };
  }

  ngOnInit() {
    console.log(this.route.queryParams['_value'].email);
    this.userData.email = this.route.queryParams['_value'].email;
    console.log('Sign Up component is loaded');
  }

  confirm() {
    this.service.confirm(this.userData).subscribe();
  }

}

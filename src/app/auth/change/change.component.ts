import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

declare interface UserData {
  code: string;
  password: string;
  passwordConfirm: string;
}

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss', '../auth.component.scss']
})
export class ChangeComponent implements OnInit {

  public userData: UserData;

  constructor(
    public service: AuthService,
    public route: ActivatedRoute) {
    this.userData = { code: '', password: '', passwordConfirm: '' };
  }

  ngOnInit() {
    console.log(this.route.queryParams['_value'].code);
    this.userData.code = this.route.queryParams['_value'].code;
    console.log('Sign Up component is loaded');
  }

  change() {
    this.service.change(this.userData).subscribe();
  }
}

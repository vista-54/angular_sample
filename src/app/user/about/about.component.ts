import { Component, OnInit } from '@angular/core';
import { AboutService } from './shared/about.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private title: string;
  private text: string;

  constructor(
    private aboutService: AboutService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.forEach(res => {
      this.title = res['data']['entity']['title'];
      this.text = res['data']['entity']['text'];
    });
  }

  sendPush() {
    this.aboutService.update({ text: this.text, title: this.title }).subscribe();
  }
}

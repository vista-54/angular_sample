import {Component, OnInit} from "@angular/core";
import {PushService} from "./shared/services/push.service";
import {DataTitleService} from "../../shared/providers/data-title.service";

@Component({
    selector: 'app-user-push',
    templateUrl: './push.component.html',
    styleUrls: ['./push.component.scss']
})
export class PushComponent implements OnInit {

    text: string;

    constructor(public pushService: PushService, public data: DataTitleService) {
    }

    ngOnInit() {
        this.data.changeTitle('Уведомления');
    }

    sendPush() {
        this.pushService.setNot({text: this.text}).subscribe(() => {
            this.text = '';
        });
    }
}
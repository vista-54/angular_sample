import {Component, OnInit} from "@angular/core";
import {DataTitleService} from "../../shared/providers/data-title.service";

@Component({
    selector: 'app-user-product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

    constructor(public data: DataTitleService) {

    }

    ngOnInit() {
        this.data.changeTitle('Товары');
    }
}
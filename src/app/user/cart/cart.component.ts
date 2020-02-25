import { Component, OnInit } from "@angular/core";
import { TableComponent } from "src/app/shared/components/table.component";
import { CartService } from "./shared/services/cart.service";
import { BsModalService } from "ngx-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { DataTitleService } from "src/app/shared/providers/data-title.service";

@Component({
    selector: 'app-user-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent extends TableComponent implements OnInit {

    public tableHeader = ['Имя', 'Артикул', 'Цена', 'Количество', 'Категория', 'Дата'];
    public tableHeaderTitle = ['Имя', 'Почта', 'Телефон'];

    constructor(public cartService: CartService,
        public modalService: BsModalService,
        public route: ActivatedRoute,
        public dataTitle: DataTitleService
    ) {
        super(cartService, modalService);
        this.editMode = false;
    }

    ngOnInit() {
        this.dataTitle.changeTitle('Заказы');
        this.route.data.forEach(success => {
            this.list = success['cart']['entity']['data'];
            this.params['page'] = success['cart']['entity']['current_page'];
            this.totalItems = success['cart']['entity']['total'];
        });
    }
}
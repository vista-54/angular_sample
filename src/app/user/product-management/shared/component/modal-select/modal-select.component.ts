import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalProductService } from './shared/modal-product.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss']
})
export class ModalSelectComponent extends TableComponent implements OnInit {

  itemWithComents: any;

  public onClose: Subject<any>;
  private object: object = {};

  constructor(
    public bsModalRef: BsModalRef,
    public modalProductService: ModalProductService,
    public modalService: BsModalService) {
    super(modalProductService, modalService);
  }

  ngOnInit() {
    this.tableHeader = ['Картинка', 'Название', 'Поставщик', 'Количество отзывов'];
    this.list = this.itemWithComents;
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.object['status'] = true;
    this.object['list'] = this.selectedGroceries;
    this.onClose.next(this.object);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.object['status'] = false;
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}

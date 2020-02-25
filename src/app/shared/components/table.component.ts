import { Injectable, TemplateRef } from "@angular/core";
import { EntityService } from "../base/entity.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Injectable()
export class TableComponent {

    public list: any[] = [];
    public id: number;
    public tableHeader: any;
    public totalItems: number;
    public currentPage: number;
    public itemsPerPage: number;
    public toItems: number;
    public params: object = {};
    public editMode: boolean;
    public modalRef: BsModalRef;
    public data: object = {};
    /** @deprecated */
    public entity: object;
    // private firstOpen: boolean = false;
    public boundaryLinks: boolean;
    public fruitChecked = false;
    public fruitIndeterminate = false;
    public selectedGroceries: any[] = [];

    // public data: any;

    // public arrItem: number[] = [];
    // public checkedd: boolean;

    constructor(public service: EntityService, public modalService: BsModalService) {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.boundaryLinks = true;
        this.params = { page: this.currentPage, limit: this.itemsPerPage };
    }

    getAll() {
        for (let i in this.params) {
            if (this.params[i] == null || this.params[i].length === 0) {
                delete this.params[i];
            }
        }
        this.service.get(null, this.params)
            .subscribe(success => {
                this.list = success['entity']['data'];
                this.currentPage = success['entity']['current_page'];
                this.totalItems = success['entity']['total'];
                this.toItems = success['entity']['to'];
            });

    }

    public toggleFruitCheck(event: any): void {
        if (event.checked
        ) {
            this.selectedGroceries = [];
            this.selectedGroceries = this.selectedGroceries.filter(el => {
                return el !== this.list['id'];
            });
            for (let i = 0; i < this.list.length; i++) {
                this.selectedGroceries = [...this.selectedGroceries, this.list[i].id];
            }
        } else {
            this.selectedGroceries = this.selectedGroceries.filter(el => {
                return el['id'] !== this.list['id'];
            });
        }
    }

    public onFruitChange(event?: any): void {
        if (this.selectedGroceries.length === this.list.length
        ) {
            this.fruitChecked = true;
            this.fruitIndeterminate = false;
        } else if (this.selectedGroceries.length < this.list.length && this.selectedGroceries.length > 0) {
            this.fruitChecked = false;
            this.fruitIndeterminate = true;
        } else if (this.selectedGroceries.length === 0) {
            this.fruitChecked = false;
            this.fruitIndeterminate = false;
        }
    }

    checked(id: number) {
        let y = this.selectedGroceries.indexOf(id);
        return this.selectedGroceries[y];
    }

    deleteMass() {
        this.service.delete({ ids: this.selectedGroceries })
            .subscribe(() => {
                this.selectedGroceries = [];
                this.fruitChecked = false;
                this.fruitIndeterminate = false;
                this.getAll();
            });
    }

    /**
     * Create a new record
     */
    create() {
        this.service.edit(this.entity)
            .subscribe(() => {
                this.modalRef.hide();
                this.getAll();
            });
    }

    destroyModal(template: TemplateRef<any>, data: any) {
        this.data = data;
        this.modalRef = this.modalService.show(template);
    }

    /**
     * delete record
     */
    destroy() {
        this.service.deleteOnce(this.data)
            .subscribe(() => {
                this.modalRef.hide();
                this.selectedGroceries = [];
                this.fruitChecked = false;
                this.fruitIndeterminate = false;
                this.getAll();
            });
    }

    pageChanged(event: any): void {
        this.params['page'] = event.page;
        this.getAll();
    }

}
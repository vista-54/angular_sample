import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ProductManagementService } from "../shared/services/product-management.service";
import { BsModalService } from "ngx-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { ROLES } from "../../../shared/constants/roles";
import { LocalStorageService } from "ngx-store";
import { Observable, fromEvent, Subject } from "rxjs";
import { debounceTime, tap, buffer } from "rxjs/operators";
import { ModalSelectComponent } from "../shared/component/modal-select/modal-select.component";
import { TableComponent } from "src/app/shared/components/table.component";

@Component({
    selector: 'app-user-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends TableComponent implements OnInit, AfterViewInit {

    @ViewChild('input')
    input: ElementRef;
    stream: Observable<any>;

    @ViewChild('deleteTempl')
    deleteTempl: any;

    public categories: any;
    public providers: any;
    public comments: any;
    public showProviderSelector: boolean;
    public user: any;
    public entity = {
        id: '',
        name: '',
        price: '',
        article: '',
        count: 0,
        new: false,
        action: false,
        description: '',
        category_id: 1,
        provider_id: 1,
        image_link: '',
        fields: [],
        attributes: []
    };

    constructor(public productService: ProductManagementService,
        public modalService: BsModalService,
        public route: ActivatedRoute,
        public localStorageService: LocalStorageService) {
        super(productService, modalService);
        this.editMode = false;
        this.user = this.localStorageService.get('user');
        this.showProviderSelector = this.user.role_id === ROLES.Admin;
    }

    ngOnInit() {
        this.tableHeader = ['Картинка', 'Название', 'Поставщик', 'Категория', 'Цена', 'В наличии'];
        this.route.data.forEach(success => {
            this.list = success['product']['entity']['data'];
            this.params['page'] = success['product']['entity']['current_page'];
            this.totalItems = success['product']['entity']['total'];
        });
    }

    ngAfterViewInit() {
        this.stream = fromEvent(this.input.nativeElement, 'keyup');
        this.stream.pipe(buffer(this.stream.pipe(debounceTime(500)))).forEach(() => this.getAll());
    }

    categoryChanged() {
        const id = +this.entity.category_id;
        this.entity.fields = this.productService.getFieldsByCategory(id, this.categories);
    }

    proviredChange(ev: any) {
        this.entity.provider_id = ev.target.value;
    }

    openModal(template: TemplateRef<any>, data: any = null) {
        if (data) {
            this.id = data['id'];
        } else {
            this.id = null;
        }
        if (this.id == null) {
            this.editMode = false;
            this.productService.getCategory(null, { pagination: 0 })
                .subscribe(success => {
                    this.categories = success['entity'];
                    this.categoryChanged();
                });
            this.productService.getProvider(null, { pagination: 0 })
                .subscribe(success => {
                    this.modalRef = this.modalService.show(template);
                    this.providers = success['entity']['data'];
                });
        } else {
            this.editMode = true;
            this.productService.get(this.id)
                .subscribe(success => {
                    this.modalRef = this.modalService.show(template);
                    this.entity = success['entity'];
                    this.categories = success['categories'];
                    this.providers = success['providers'];
                });
        }
    }

    actionChange(ev: any, id: number): void {
        this.entity.action = ev['checked'];
    }

    newChange(ev: any, id: number): void {
        this.entity.new = ev['checked'];
    }

    create() {
        if (!this.editMode) {
            console.log(this.entity);
            this.productService.create(this.entity)
                .subscribe(() => {
                    this.modalRef.hide();
                    this.getAll();
                });
        } else {
            this.productService.update(this.entity)
                .subscribe(() => {
                    this.modalRef.hide();
                    this.getAll();
                });
        }
    }

    destroyModal(template: TemplateRef<any>, data: any) {
        this.data = data;
        if (data.comment_count > 0) {
            this.comments = true;
        } else {
            this.comments = false;
        }
        this.modalRef = this.modalService.show(template);
    }

    handleFileInput(files: FileList) {
        this.entity['file'] = files.item(0);
    }

    import() {
        this.productService.postFile(this.entity)
            .subscribe(() => {
                this.modalRef.hide();
                this.getAll();
            });
    }

    deleteMass() {
        let itemWithComents = [];
        let finishArr;
        let is_comment = true;
        const intersection = this.list.filter(element => this.selectedGroceries.includes(element.id));
        intersection.map(el => {
            if (el.comment_count > 0) {
                itemWithComents.push(el);
                let x = this.selectedGroceries.indexOf(el.id);
                let b = this.selectedGroceries.splice(x, 1);
                is_comment = false;
            }
        });
        if (is_comment) {
            this.deleteArr();
        }
        const initialState = {
            itemWithComents
        };
        if (itemWithComents.length) {
            this.modalRef = this.modalService.show(ModalSelectComponent, { initialState });
            this.modalRef.content.onClose.subscribe(result => {
                if (result['status']) {
                    finishArr = itemWithComents.filter(element => result['list'].includes(element.id));
                    for (let i = 0; i < finishArr.length; i++) {
                        this.selectedGroceries.push(finishArr[i]['id']);
                    }
                    console.log('delete, work');
                    this.deleteArr();
                    is_comment = true;
                } else {
                    this.deleteArr();
                    is_comment = true;
                }
            });
        }
    }

    deleteArr() {
        if (this.selectedGroceries.length) {
            this.service.delete({ ids: this.selectedGroceries })
                .subscribe(() => {
                    this.selectedGroceries = [];
                    this.fruitChecked = false;
                    this.fruitIndeterminate = false;
                    this.getAll();
                });
        } else {
            this.fruitChecked = false;
            this.selectedGroceries = [];
            this.fruitIndeterminate = false;
            this.onFruitChange();
        }
    }
}
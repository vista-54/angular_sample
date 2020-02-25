import { Component, OnInit, ViewChild, ElementRef, TemplateRef, AfterViewInit } from "@angular/core";
import { TableComponent } from "src/app/shared/components/table.component";
import { Observable, fromEvent } from "rxjs";
import { BsModalService } from "ngx-bootstrap";
import { ProviderService } from "./shared/services/provider.service";
import { UserListService } from "../shared/services/user-list.service";
import { DataTitleService } from "src/app/shared/providers/data-title.service";
import { buffer, debounceTime } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { INgxSelectOption } from "ngx-select-ex";

@Component({
    selector: 'app-provider-list',
    templateUrl: './provider-list.component.html',
    styleUrls: ['./provider-list.component.scss']
})

export class ProviderListComponent extends TableComponent implements OnInit, AfterViewInit {

    @ViewChild('input')
    input: ElementRef;
    stream: Observable<any>;

    public ngxValue: any = [];
    public ngxDisabled = false;

    public roles: any;
    public entity = {
        id: '',
        name: '',
        email: '',
        description: '',
        users: []
    };
    public searchQuery: string;
    public users: Array<Object>;
    private categories: Array<object> = [];
    constructor(
        public route: ActivatedRoute,
        public modalService: BsModalService,
        private providerService: ProviderService,
        private userListService: UserListService,
        public dataTitle: DataTitleService) {
        super(providerService, modalService);
        this.editMode = false;
    }

    ngOnInit() {
        this.tableHeader = ['Название', 'Email', 'Описание', 'Представитель'];
        this.dataTitle.changeTitle('Поставщики');
        this.route.data.forEach(success => {
            this.list = success['data']['entity']['data'];
            this.params['page'] = success['data']['entity']['current_page'];
            this.totalItems = success['data']['entity']['total'];
        });
    }

    ngAfterViewInit() {
        this.stream = fromEvent(this.input.nativeElement, 'keyup');
        this.stream.pipe(buffer(this.stream.pipe(debounceTime(500)))).forEach(() => this.searchProviders());
    }

    openModal(template: TemplateRef<any>, id: number = null) {
        this.id = id;
        this.providerService.getCategories().subscribe(success => {
            this.categories = success['entity'];
        });
        if (id == null) {
            this.editMode = false;
            this.userListService.getUser(null, { pagination: 0, role_id: 2 }).subscribe(res => {
                this.users = res['entity']['data'];
            });
            this.userListService.getRole().subscribe(res => {
                this.roles = res['entity'];
            });
            this.modalRef = this.modalService.show(template);
        } else {
            this.editMode = true;
            this.providerService.get(id)
                .subscribe(success => {
                    this.modalRef = this.modalService.show(template);
                    this.entity = success['entity'];
                    this.entity.users = success['entity']['userInfo'].map((el: any) => {
                        return el.id;
                    });
                    this.users = success['users'];
                });
        }
    }

    searchProviders() {
        this.getAll();
    }

    public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);


    create() {
        if (!this.editMode) {
            this.providerService.create(this.entity)
                .subscribe(() => {
                    this.modalRef.hide();
                    this.getAll();
                });
        } else {
            this.providerService.update(this.entity)
                .subscribe(() => {
                    this.modalRef.hide();
                    this.getAll();
                });
        }
    }

    destroyModal(template: TemplateRef<any>, id: number) {
        this.id = id;
        this.modalRef = this.modalService.show(template);
    }

    /**
     * delete record
     */
    destroy() {
        const data = {
            id: this.id
        };
        this.providerService.deleteOnce(data)
            .subscribe(() => {
                this.modalRef.hide();
                this.getAll();
            });
    }


}

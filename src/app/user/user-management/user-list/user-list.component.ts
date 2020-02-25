import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from "@angular/core";
import { TableComponent } from "src/app/shared/components/table.component";
import { Observable, fromEvent } from "rxjs";
import { UserListService } from "../shared/services/user-list.service";
import { BsModalService } from "ngx-bootstrap";
import { LocalStorageService } from "ngx-store";
import { Router, ActivatedRoute } from "@angular/router";
import { debounceTime, tap, buffer } from "rxjs/operators";
import { DataTitleService } from "src/app/shared/providers/data-title.service";


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends TableComponent implements OnInit, AfterViewInit {

    @ViewChild('input')
    input: ElementRef;
    stream: Observable<any>;
    result: string = '';

    public email: string;
    public roles: any;
    public user: any;
    public name: string;
    public entity = {
        name: '',
        surname: '',
        email: '',
        password: '',
        role_id: ''
    };

    constructor(public userService: UserListService,
        public modalService: BsModalService,
        public localStorageService: LocalStorageService,
        public router: Router,
        public route: ActivatedRoute,
        public dataTitle: DataTitleService) {
        super(userService, modalService);
    }

    ngOnInit() {
        this.dataTitle.changeTitle('Пользователи');
        this.tableHeader = [
            { name: 'Имя' },
            { name: 'Фамилия' },
            { name: 'Email' },
            {
                icon: 'assets/icon/checked_person.svg',
                name: 'Проверен'
            },
            {
                icon: 'assets/icon/sertificated_person.svg',
                name: 'Сертифицирован'
            },
            {
                name: 'Приглашен'
            },
            { name: 'Роль' },
        ];
        this.route.data.forEach(success => {
            this.list = success['data']['entity']['data'];
            this.params['page'] = success['data']['entity']['current_page'];
            this.totalItems = success['data']['entity']['total'];
        });
    }

    ngAfterViewInit() {
        this.stream = fromEvent(this.input.nativeElement, 'keyup');
        this.stream.pipe(buffer(this.stream.pipe(debounceTime(500)))).forEach(() => this.search());
    }

    openModal(template: TemplateRef<any>, user: any) {
        if (user && user['id']) {
            this.editMode = true;
            this.userService.getUser(user['id'])
                .subscribe(success => {
                    this.modalRef = this.modalService.show(template);
                    this.entity = success['entity'];
                    this.roles = success['roles'];
                });
        } else {
            this.editMode = false;
            this.userService.getRole().subscribe(res => {
                this.roles = res['entity'];
            });
            this.modalRef = this.modalService.show(template);
        }
    }

    search() {
        this.getAll();
        console.log(this.params['name']);
    }

    verifiedChange(ev: any, user_id: number) {
        console.log(ev['checked'], 'verifiedChange');
        this.userService.updateUser(user_id, { verified: ev['checked'] }).subscribe();
    }

    certifiedChange(ev: any, user_id: number) {
        console.log(ev['checked'], 'certifiedChange');
        this.userService.updateUser(user_id, { certified: ev['checked'] }).subscribe();
    }

    invite() {
        this.userService.invite({ email: this.email }).subscribe(() => this.modalRef.hide());
    }

    create() {
        if (!this.editMode) {
            this.userService.create(this.entity)
                .subscribe(() => {
                    this.modalRef.hide();
                    this.getAll();
                });
        } else {
            this.userService.update(this.entity)
                .subscribe(() => {
                    this.modalRef.hide();
                    this.getAll();
                });
        }
    }

}
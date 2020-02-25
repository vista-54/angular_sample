import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table.component';
import { SpecializationService } from './shared/services/specialization.service';
import { BsModalService } from 'ngx-bootstrap';
import { DataTitleService } from 'src/app/shared/providers/data-title.service';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent extends TableComponent implements OnInit {

  public entity = {
    name: ''
  };

  constructor(
    private dataTitle: DataTitleService,
    private route: ActivatedRoute,
    public specService: SpecializationService,
    public modalService: BsModalService
  ) {
    super(specService, modalService);
  }

  ngOnInit() {
    this.tableHeader = ['Название', 'Создание'];
    this.dataTitle.changeTitle('Специализации');
    this.route.data.forEach(success => {
      this.list = success['data']['entity']['data'];
      this.params['page'] = success['data']['entity']['current_page'];
      this.totalItems = success['data']['entity']['total'];
    });
  }

  openModal(template: TemplateRef<any>, id: number = null) {
    this.id = id;
    if (id == null) {
      this.editMode = false;
      this.modalRef = this.modalService.show(template);
    } else {
      this.editMode = true;
      this.specService.get(id)
        .subscribe(success => {
          this.modalRef = this.modalService.show(template);
          this.entity = success['entity'];
        });
    }
  }

  create() {
    if (!this.editMode) {
      this.specService.create(this.entity)
        .subscribe(() => {
          this.modalRef.hide();
          this.getAll();
        });
    } else {
      this.specService.update(this.entity)
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
    this.specService.deleteOnce(data)
      .subscribe(() => {
        this.modalRef.hide();
        this.getAll();
      });
  }

}

import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/base/entity.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class ModalProductService extends EntityService {

  constructor(public request: RequestService) {
    super(request);
    this.service_name = 'modal-product';
  }
}

import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/base/entity.service';
import { Resolve } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class SpecializationService extends EntityService implements Resolve<any> {

  constructor(public request: RequestService) {
    super(request);
    this.service_name = 'specialization';
  }

  resolve() {
    return this.get();
  }
}

import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/base/entity.service';
import { Resolve } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AboutService extends EntityService implements Resolve<any> {

  constructor(public request: RequestService) {
    super(request);
    this.service_name = 'about';
  }

  resolve() {
    return this.getAll();
  }

  getAll() {
    let url = this.url('index');
    return this.request.get(url);
  }

  update(data: object) {
    let url = this.url('index');
    return this.request.put(url, data).pipe(
      tap(res => {
        if (res['entity']) {
          const msg = this.msg('update');
          this.notification('success', msg);
        } else {
          const msg = this.msg('problem');
          this.notification('danger', msg);
        }
      }, err => {
        this.incorrectValidationErrors(err.error.error);
      })
    );
  }
}

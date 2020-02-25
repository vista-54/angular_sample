import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class DataTitleService {

    private titleSource = new BehaviorSubject('');
    currentTitle = this.titleSource.asObservable();

    constructor() { }

    changeTitle(titleInfo: string) {
        this.titleSource.next(titleInfo);
    }

}
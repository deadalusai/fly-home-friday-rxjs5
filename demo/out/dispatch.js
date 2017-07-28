import { Subject } from 'rxjs/Subject';
let uuid = 0;
export class GrandCentralDispatch {
    constructor() {
        this._dispatch$ = new Subject();
    }
    acquire() {
        return this._dispatch$.asObservable();
    }
    send(data) {
        this._dispatch$.next({ id: uuid++, data });
    }
}

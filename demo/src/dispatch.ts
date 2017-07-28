import { Subject } from 'rxjs/Subject';

// Simulate some global pub/sub service

export interface Message {
    id: number;
    data: string;
}

let uuid = 0;

export class GrandCentralDispatch {
    private _dispatch$ = new Subject<Message>();
    acquire() { 
        return this._dispatch$.asObservable();
    }
    send(data: string) {
        this._dispatch$.next({ id: uuid++, data });
    }
}

import { Observable } from 'rxjs/Observable';
import { GrandCentralDispatch, Message } from "./dispatch";

const GRAND_CENTRAL_DISPATCH = new GrandCentralDispatch();

class MyComponent {

    constructor(private name: string, dispatch: GrandCentralDispatch) {
        let bus$ = dispatch.acquire();
        bus$.subscribe(msg => {
            this.handleMessage(msg);
        })
    }

    private handleMessage(message: Message) {
        console.log(this.name, message.id, message.data);
    }

    dispose() {
        
    }
}


let a = new MyComponent('Brad', GRAND_CENTRAL_DISPATCH);
let b = new MyComponent('Sally', GRAND_CENTRAL_DISPATCH);

GRAND_CENTRAL_DISPATCH.send("Hello, world");

a.dispose();
a = null;

GRAND_CENTRAL_DISPATCH.send("Goodbye, moon");

b.dispose();
b = null;

GRAND_CENTRAL_DISPATCH.send("Nobody is listening");
import { Observable } from 'rxjs/Observable';

console.log('Example 2');

function someOtherAsyncThing (v: string) {
    console.log(v);
    return Promise.resolve(v.length);
}

let a = Promise.resolve('Hello from promises');
let b = a.then(v => someOtherAsyncThing(v))
         .then(v => v * 2);

b.then(
    val => console.log('Promise', val),
    err => console.error('Promise', err)
);

let x$ = Observable.of('Hello from observables');
let y$ = x$.concatMap(v => someOtherAsyncThing(v))
           .map(v => v * 2);

y$.subscribe(
    val => console.log('Observable', val), 
    err => console.error('Observable', err), // optional
    () => console.log('Observable', 'Done')  // optional
);
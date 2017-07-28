import { Observable } from 'rxjs/Observable';
console.log('Example 1');
// Arrays are iterable
let a = [1, 2, 3, 4];
let b = a.filter(v => v % 2 === 0)
    .map(v => v * 2);
// could raise an error
for (let val of b) {
    console.log('Iterable', val);
}
// Construct a "cold" observable
let x$ = Observable.of(1, 2, 3);
let y$ = x$.filter(v => v % 2 === 0)
    .map(v => v * 2);
y$.subscribe(val => console.log('Observable', val), err => console.error('Observable', err), // optional
() => console.log('Observable', 'Done') // optional
);

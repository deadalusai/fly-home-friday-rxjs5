class: center, middle

# RxJS 5.0
## The What, the How and the Why

Benjamin Fox | [Intergen](http://teamintergen.com)

---

# What is RxJS?

http://reactivex.io

RxJS is the latest JavaScript implementation of the Observables pattern, colloqually known as "Reactive Extensions" or "Rx".

Rx provides a pattern for manipulating and consuming synchronous or asynchronous sequences of data.

RxJS 5.0 is written in TypeScript.

---

# Code example

```
let a = Observable.of(1, 2, 3);

let b = a.map(x => x * 2);

b.subscribe(y => console.log(y));
```
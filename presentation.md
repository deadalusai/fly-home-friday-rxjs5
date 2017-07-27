class: center, middle

# RxJS 5.0
## The What, the How and the Why

Benjamin Fox | [Intergen](http://teamintergen.com)

---

# What is RxJS?

http://reactivex.io

RxJS is the latest JavaScript implementation of the Rx library for the *reactive programming* pattern. **Rx**, or "Reactive Extensions" has been implemented in a number of languages.

Rx introduces the `Observable` type:

- Comparable to `Iterables`, and share many capabilities:
    - `map`, `filter`, `join`, `group`, etc..
    - Infinite or finite
- Comparable to `Promises`, and share many capabilities:
    - `then`/`flatMap`, `catch`, etc..
- Supports asynchronous sequences
- **Pull** vs **push**

RxJS 5.0 is written in TypeScript.

???

# What is RxJS?

RxJS is the latest JavaScript implementation of the Rx library for the *reactive programming* pattern. **Rx**, or "Reactive Extensions" has been implemented in a number of languages.

Rx introduces the `Observable` type, which provides an interface for manipulating and consuming synchronous or asynchronous sequences of data.

Observables are comparable to both *Iterables* and *Promises* - lazily evaluated sequences of data. 

Iterables may be finite or infinite and can be lazily evaluated as the consumer **pulls** data. Like Iterables, Observables can be mapped, filtered, joined, grouped, etc.

Promises represent a single future value and are evaluated when data arrives.

Observables are a combination of both: Like Promises they respond to data being **pushed** to the consumer. For this reason they expose a necessarily asynchronous interface, though they may work completely synchronously. Like Iterables, they may represent a finite or infinite sequence.

RxJS 5.0 is written in TypeScript.

---

# Observables vs Iterables

- Both can represent finite or infinite sequences

- Both provide an interface for chaining

- Both support error reporting/handling

- Only Observables can represent asynchronous results

[Iteration protocols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols)

???

How do observables compare with promises? 

Both support finite or infinite sequences, and support chaining and manipulation of results. Both provide an interface
for error handling
- Observables provide the __error__ callback.
- Iterables may raise an error on __next__.

Only observables can represent asynchronous results.

Warning: "hot" subscriptions must be carefully disposed.

---

# Examples

### Iterables

```
// Arrays are iterable
let a = [1, 2, 3, 4];
let b = a.filter(v => v % 2 === 0)
         .map(v => v * 2);

// could raise an error
for (let val of b) {
    console.log(val);
}
```

### Observables

```
// Construct a "cold" observable
let x = Observable.of(1, 2, 3);
let y = x.filter(v => v % 2 === 0)
         .map(v => v * 2);

y.subscribe(
    val => console.log(val), 
    err => console.error(err),  // optional
    () => console.log('Done')   // optional
);
```

???

Both of these examples operate completely synchronously. This observable is called a __cold__ observable. We'll examine this more later. 

---

# Observables vs Promises

- Both can be synchronous or asynchonous

- Both can represent a future result

- Both provide interface to chain async code

- Both support error handling

- Only Observables can represent an empty sequence or multiple results

- Only Observables can represent ongoing events


**Important difference:** Promises represent an operation in progress. Observables *may* represent events in progress (hot), but may also be lazily evaluated (cold).


???


How do observables compare with promises? 

Both can represent some future data. 
Both support chaining. RxJS supports chaining with promises.
Both support error handling.

Only observables can represent an empty sequence, or multiple results.
Only observables can represent ongoing, asynchronous events.

Warning: "hot" subscriptions must be carefully disposed.

---

# Examples

### Promises

```
let a = Promise.resolve('Hello from promises');
let b = a.then(v => someOtherAsyncThing(v))
         .then(v => v * 2);

b.then(
    val => console.log(val),
    err => console.error(err)  // optional
);
```

### Observables

```
let x = Observable.of('Hello from observables');
let y = x.flatMap(v => someOtherAsyncThing(v))
         .map(v => v * 2);

y.subscribe(
    val => console.log(val), 
    err => console.error(err), // optional
    () => console.log('Done')  // optional
);
```

???

Both of these examples **should** operate completely synchronously. This observable is called a __cold__ observable. We'll examine this more later. 


---

# Getting Started

RxJS is available is two forms:

**Single file** - Install via CDN or local file.
  
- Including the file directly declares a global `Rx` namespace. 
- Including via a module loader (e.g. AMD):

```
require(['rx'], (Rx) => { ... }); 
```

**Modular** - Install via NPM or JSPM.

Include using module import syntax. E.g. TypeScript: 

```
import { Observable } from 'rxjs/Observable';`
```

Modular imports allow you to include only the code you need on a per-operator basis.
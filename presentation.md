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
- Observables provide the _error_ callback.
- Iterables may raise an error on _next_.

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

Both of these examples operate completely synchronously. This observable is called a _cold_ observable. We'll examine this more later. 

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

Both of these examples **should** operate completely synchronously. This observable is called a _cold_ observable. We'll examine this more later. 


---

# Getting Started

RxJS is available is two forms:

**Single file** - Install via CDN or local file.
  
- Include the file directly declares a global `Rx` namespace. 
- Include via a module loader (e.g. AMD)

> No official typings for this use-case :(


**Modular** - Install via NPM/JSPM.

Include using module import syntax. E.g. TypeScript: 

```
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'; // enable switchMap operator
```

Modular imports allow you to include only the code you need on a per-operator basis, but requires a module loader like Webpack or SystemJS to ship code.


???


RxJS 5 is written in modular TypeScript, and requires a javascript module loader to use properly. There is a global/single-file version of the library available, but no official typings exist to use with it.

With modular RxJS it is recommended that you import only the operators/functions you actually use within your application - this reduces the amount of code loaded at runtime.


---


# A few observable concepts

- **Observable** - Represents an observable event/value sequence
- **Observer** - A collection of callbacks which handle Observable events
- **Subscription** - Represents the subscription to an observable of an observer. Used for cancellation
- **Operators** - Functions for manipulating an Observable sequence, e.g. `flatMap`, `filter`
- **Subject** - An _Observable_ with an API for generating events

The **Observer** callbacks are:

- `next(value)` - Called for each event in the stream
- `error(err)` - Called when an error is emitted and the stream ends
- `complete()` - Called when the stream ends (except on an error)


???


Some terms and their definitions.


The three Observer callback functions and their behaviour map directly to the _Iterable_ interface.

- **next** - The body of the `for` loop
- **error** - An exception raised by the Iterator. This kills the loop
- **complete** - The end of the loop


---


# Constructing Cold Observables

Construct a cold, finite observable:

```
let o1 = Observable.of(1, 2, 3);
```

Construct a cold, dynamic observable:

```
let o2 = Rx.Observable.create(function (observer) {
    observer.next(1);
    observer.complete();
})
```


???

Cold observables emit their events for each subscriber, immediately on subscription. Every subscriber receives their own series of events (events are not shared).


---


# Constructing Hot Observables


Construct a subject:

```
let s = new Subject();
s.next(new Foo());
s.complete();
```

Construct from an event:

```
let o3 = Observable.fromEvent(buttonElement, 'click');
```

Construct from a promise:

```
let o5 = Observable.fromPromise(promise);
```

???

Warm observables emit only one series of events, which are sent to each subscriber as they arrive. Events are emitted to subscribers as they occur.
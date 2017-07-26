class: center, middle

# RxJS 5.0
## The What, the How and the Why

Benjamin Fox | [Intergen](http://teamintergen.com)

---

# What is RxJS?

http://reactivex.io

RxJS is the latest JavaScript implementation of the Rx library for the *reactive programming* pattern. **Rx**, or "Reactive Extensions" has been implemented in a number of languages.

- Rx introduces the `Observable` type.
- Commonly compared to `Iterables`, and shares many capabilities:
    - `map`, `filter`, `join`, `group`, etc..
    - Infinite or finite
- Supports asynchronous sequences
- **Pull** vs **push**

RxJS 5.0 is written in TypeScript.

???

# What is RxJS?

RxJS is the latest JavaScript implementation of the Rx library for the *reactive programming* pattern. **Rx**, or "Reactive Extensions" has been implemented in a number of languages.

Rx introduces the `Observable` type, which provides an interface for manipulating and consuming synchronous or asynchronous sequences of data.

Observables are commonly compared to *Iterables* - lazily evaluated sequences of data. Iterables may be finite or infinite and can be lazily evaluated as the consumer **pulls** data. Like Iterables, Observables can be mapped, filtered, joined, grouped, etc.

Observables have an important difference - they respond to data being **pushed** to the consumer. For this reason they expose a necessarily asynchronous interface, though they may work completely synchronously.

RxJS 5.0 is written in TypeScript.

---

### Iterables

```
let a = [1, 2, 3, 4]; // Arrays are iterable
let b = a.filter(v => v % 2 === 0)
         .map(v => v * 2);

for (let val of b) {
    console.log(val);
}
```

### Observables

```
let x = Observable.of(1, 2, 3);
let y = a.filter(v => v % 2 === 0)
         .map(v => v * 2);

y.subscribe(val => console.log(val));
```

???

# Code example

Here is a comparison of the Iterable and Observable interfaces. The transformation of the input sequence is very similar - chaining together transformation functions to create a new sequence.

The "iterable" example just uses an array, but could just as easily be a iterable library object or a generator. The "for/of" construct is language syntax sugar for consuming an iterable sequence. It will run forever or until the sequence is completed. The second example shows us consuming the iterable sequence manually.

In the "observable" example, we use the `subscribe` function to *subscribe* to events on the observable. Our handler will continue to fire forever, or until the sequence is completed.

[Iteration_protocols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols)

Both of these examples operate completely synchronously - we'll examine this more later.
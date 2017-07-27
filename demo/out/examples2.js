define(["require", "exports", "rx"], function (require, exports, rx_1) {
    "use strict";
    exports.__esModule = true;
    console.log('Example 2');
    function someOtherAsyncThing(v) {
        console.log(v);
        return Promise.resolve(v.length);
    }
    var a = Promise.resolve('Hello from promises');
    var b = a.then(function (v) { return someOtherAsyncThing(v); })
        .then(function (v) { return v * 2; });
    b.then(function (val) { return console.log('Promise', val); }, function (err) { return console.error('Promise', err); });
    var x = rx_1.Observable.of('Hello from observables');
    var y = x.flatMap(function (v) { return someOtherAsyncThing(v); })
        .map(function (v) { return v * 2; });
    y.subscribe(function (val) { return console.log('Observable', val); }, function (err) { return console.error('Observable', err); }, // optional
    function () { return console.log('Observable', 'Done'); } // optional
    );
});

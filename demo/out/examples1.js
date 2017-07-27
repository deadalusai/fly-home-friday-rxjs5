define(["require", "exports", "rx"], function (require, exports, rx_1) {
    "use strict";
    exports.__esModule = true;
    console.log('Example 1');
    // Arrays are iterable
    var a = [1, 2, 3, 4];
    var b = a.filter(function (v) { return v % 2 === 0; })
        .map(function (v) { return v * 2; });
    // could raise an error
    for (var _i = 0, b_1 = b; _i < b_1.length; _i++) {
        var val = b_1[_i];
        console.log('Iterable', val);
    }
    // Construct a "cold" observable
    var x = rx_1.Observable.of(1, 2, 3);
    var y = x.filter(function (v) { return v % 2 === 0; })
        .map(function (v) { return v * 2; });
    y.subscribe(function (val) { return console.log('Observable', val); }, function (err) { return console.error('Observable', err); }, // optional
    function () { return console.log('Observable', 'Done'); } // optional
    );
});

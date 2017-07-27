var require = {
    baseUrl: './out',
    paths: {
        "rx":  "../lib/rxjs/Rx.5.4.2",
        "tslib": "../lib/tslib/tslib"
    }
};
if (typeof exports === 'object') {
    exports.config = require;
}

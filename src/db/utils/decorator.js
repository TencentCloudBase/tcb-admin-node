"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bound(target, propertyKey, descriptor) {
}
exports.bound = bound;
function enumerable(value) {
    const fn = function (target, key) {
        Object.defineProperty(target, key, {
            enumerable: value,
            configurable: true,
            writable: true,
        });
    };
    return fn;
}
exports.enumerable = enumerable;

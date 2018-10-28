"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
function shallowClone(value, strict = false) {
    if (strict) {
        return strictShallowClone(value);
    }
    if (type_1.isPlainObject(value)) {
        return Object.assign({}, value);
    }
    switch (type_1.getType(value)) {
        case 'object': {
            return value;
        }
        case 'array': {
            return value.slice();
        }
        default: {
            return value;
        }
    }
}
exports.shallowClone = shallowClone;
function strictShallowClone(value) {
    switch (type_1.getType(value)) {
        case 'object': {
            return Object.assign({}, value);
        }
        case 'array': {
            return value.slice();
        }
        case 'number': {
            return (value instanceof Number) ? new Number(value) : value;
        }
        case 'string': {
            return (value instanceof String) ? new String(value) : value;
        }
        case 'boolean': {
            return (value instanceof Boolean) ? new Boolean(value) : value;
        }
        case 'date': {
            return new value.constructor(+value);
        }
        case 'map': {
            return new Map(value);
        }
        case 'set': {
            return new Set(value);
        }
        default: {
            return value;
        }
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegExp {
    constructor({ regexp, options }) {
        if (!regexp) {
            throw new TypeError("regexp must be a string");
        }
        this.regexp = regexp;
        this.options = options;
    }
    parse(key) {
        return {
            [key]: {
                $regex: this.regexp,
                $options: this.options
            }
        };
    }
}
exports.RegExp = RegExp;
function RegExpConstructor(param) {
    return new RegExp(param);
}
exports.RegExpConstructor = RegExpConstructor;

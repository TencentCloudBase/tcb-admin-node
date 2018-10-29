"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegExp {
    constructor({ regexp, options }) {
        if (!regexp) {
            throw new TypeError('regexp must be a string');
        }
        this.regexp = regexp;
        this.options = options;
    }
}
exports.default = RegExp;

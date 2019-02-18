"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("../helper/symbol");
const type_1 = require("../utils/type");
const lineString_1 = require("./lineString");
class MultiLineString {
    constructor(lines) {
        lines.forEach(line => {
            lineString_1.LineString.validate(line);
        });
        this.lines = lines;
    }
    parse(key) {
        return {
            [key]: {
                type: 'MultiLineString',
                coordinates: this.lines.map(line => {
                    return line.points.map(point => [point.longitude, point.latitude]);
                })
            }
        };
    }
    toJSON() {
        return {
            type: 'MultiLineString',
            coordinates: this.lines.map(line => {
                return line.points.map(point => [point.longitude, point.latitude]);
            })
        };
    }
    static validate(multiLineString) {
        if (multiLineString.type !== 'MultiLineString' || !type_1.isArray(multiLineString.coordinates)) {
            return false;
        }
        for (let line of multiLineString.coordinates) {
            for (let point of line) {
                if (!type_1.isNumber(point[0]) || !type_1.isNumber(point[1])) {
                    return false;
                }
            }
        }
        return true;
    }
    get _internalType() {
        return symbol_1.SYMBOL_GEO_MULTI_LINE_STRING;
    }
}
exports.MultiLineString = MultiLineString;

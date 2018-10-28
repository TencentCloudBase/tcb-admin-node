"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("utils/type");
const common_1 = require("./common");
class Decoder {
    constructor() {
    }
    static decode(data) {
        const decoder = new Decoder();
        return decoder.decodeData(data);
    }
    decodeData(data) {
        switch (type_1.getType(data)) {
            case 'object': {
                return this.decodeObject(data);
            }
            case 'array': {
                return data.map(value => {
                    if (type_1.isObject(value)) {
                        const decoded = common_1.decodeInternalDataType(value);
                        if (decoded !== value) {
                            return decoded;
                        }
                        return this.decodeObject(value);
                    }
                    else
                        return value;
                });
            }
            default: {
                return data;
            }
        }
    }
    decodeObject(data) {
        const ret = Object.assign({}, data);
        for (const key in ret) {
            const value = ret[key];
            const valueType = type_1.getType(value);
            switch (valueType) {
                case 'object': {
                    const decoded = common_1.decodeInternalDataType(value);
                    if (decoded !== value) {
                        ret[key] = decoded;
                    }
                    else {
                        ret[key] = this.decodeObject(ret[key]);
                    }
                    break;
                }
                case 'array': {
                    const decoded = this.decodeData(value);
                    if (decoded !== value) {
                        ret[key] = decoded;
                    }
                    break;
                }
                default: {
                    continue;
                }
            }
        }
        return ret;
    }
}
exports.Decoder = Decoder;

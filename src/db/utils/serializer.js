"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const error_config_1 = require("config/error.config");
const type_1 = require("./type");
function serialize(data) {
    const serializable = toJSONSerializable(data);
    return JSON.stringify(serializable);
}
exports.serialize = serialize;
function toJSONSerializable(data, name = 'data') {
    if (data === null || data === undefined) {
        return undefined;
    }
    if (data === true || data === false) {
        return data;
    }
    const type = type_1.getType(data);
    switch (type) {
        case 'number': {
            if (isFinite(data)) {
                return data;
            }
            break;
        }
        case 'string': {
            return data;
        }
        case 'array': {
            return data.map((item, i) => toJSONSerializable(item, `${name}[${i}]`));
        }
        case 'object': {
            const serializableObject = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    serializableObject[key] = toJSONSerializable(data[key], `${name}.${key}`);
                }
            }
            return serializableObject;
        }
        case 'arraybuffer': {
            const uint8array = new Uint8Array(data);
            return {
                type: 'Buffer',
                data: [...uint8array],
            };
        }
    }
    if (typeof data === 'function') {
        return data;
    }
    throwJSONSerializableError(name);
}
exports.toJSONSerializable = toJSONSerializable;
function deserialize(x) {
    const data = JSON.parse(x);
    return deserializeData(data);
}
exports.deserialize = deserialize;
function deserializeData(data) {
    switch (type_1.getType(data)) {
        case 'object': {
            return deserializeObject(data);
        }
        case 'array': {
            return data.map(deserializeData);
        }
        default: {
            return data;
        }
    }
}
function deserializeObject(data) {
    const ret = data;
    const retDecoded = deserializeSpecialDataType(ret);
    if (ret !== retDecoded) {
        return retDecoded;
    }
    for (const key in ret) {
        const value = ret[key];
        const valueType = type_1.getType(value);
        switch (valueType) {
            case 'object': {
                const decoded = deserializeSpecialDataType(value);
                if (decoded !== value) {
                    ret[key] = decoded;
                }
                else {
                    ret[key] = deserializeObject(ret[key]);
                }
                break;
            }
            case 'array': {
                const decoded = deserializeData(value);
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
function deserializeSpecialDataType(object) {
    for (const key in object) {
        switch (key) {
            case 'type': {
                switch (object.type) {
                    case 'Buffer': {
                        if (type_1.isArray(object.data) && type_1.isNumber(object.data[0])) {
                            try {
                                const array = new Uint8Array(object.data);
                                return array.buffer;
                            }
                            catch (e) {
                                return object;
                            }
                        }
                    }
                }
                break;
            }
        }
    }
    return object;
}
function throwJSONSerializableError(name) {
    throw new error_1.CloudSDKError({
        errCode: error_config_1.ERR_CODE.SDK_API_PARAMETER_TYPE_ERROR,
        errMsg: `${name} is not JSON-serializable`,
    });
}

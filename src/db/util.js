"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const point_1 = require("./geo/point");
class Util {
}
Util.encodeGeoPoint = (point) => {
    if (!(point instanceof point_1.Point)) {
        throw new Error("encodeGeoPoint: must be GeoPoint type");
    }
    return {
        type: "Point",
        coordinates: [point.latitude, point.longitude]
    };
};
Util.encodeTimestamp = (stamp) => {
    if (!(stamp instanceof Date)) {
        throw new Error("encodeTimestamp: must be Date type");
    }
    return {
        $timestamp: Math.floor(stamp.getTime() / 1000)
    };
};
Util.encodeDocumentDataForReq = document => {
    const keys = Object.keys(document);
    let params = {};
    if (Array.isArray(document)) {
        params = [];
    }
    keys.forEach(key => {
        const item = document[key];
        const type = Util.whichType(item);
        let realValue;
        switch (type) {
            case constant_1.FieldType.GeoPoint:
                realValue = Util.encodeGeoPoint(item);
                break;
            case constant_1.FieldType.Timestamp:
                realValue = Util.encodeTimestamp(item);
                break;
            case constant_1.FieldType.Object:
            case constant_1.FieldType.Array:
                realValue = Util.encodeDocumentDataForReq(item);
                break;
            default:
                realValue = item;
        }
        if (Array.isArray(params)) {
            params.push(realValue);
        }
        else {
            params[key] = realValue;
        }
    });
    return params;
};
Util.formatResDocumentData = (documents) => {
    return documents.map(document => {
        return Util.formatField(document);
    });
};
Util.formatField = document => {
    const keys = Object.keys(document);
    let protoField = {};
    if (Array.isArray(document)) {
        protoField = [];
    }
    keys.forEach(key => {
        const item = document[key];
        const type = Util.whichType(item);
        let realValue;
        switch (type) {
            case constant_1.FieldType.GeoPoint:
                realValue = new point_1.Point(item.coordinates[0], item.coordinates[1]);
                break;
            case constant_1.FieldType.Timestamp:
                realValue = new Date(item.$timestamp * 1000);
                break;
            case constant_1.FieldType.Object:
            case constant_1.FieldType.Array:
                realValue = Util.formatField(item);
                break;
            default:
                realValue = item;
        }
        if (Array.isArray(protoField)) {
            protoField.push(realValue);
        }
        else {
            protoField[key] = realValue;
        }
    });
    return protoField;
};
Util.whichType = (obj) => {
    let type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === constant_1.FieldType.Object) {
        if (obj instanceof point_1.Point) {
            return constant_1.FieldType.GeoPoint;
        }
        else if (obj instanceof Date) {
            return constant_1.FieldType.Timestamp;
        }
        if (obj.$timestamp) {
            type = constant_1.FieldType.Timestamp;
        }
        else if (Array.isArray(obj.coordinates) && obj.type === "Point") {
            type = constant_1.FieldType.GeoPoint;
        }
    }
    return type;
};
Util.generateDocId = () => {
    let chars = "ABCDEFabcdef0123456789";
    let autoId = "";
    for (let i = 0; i < 24; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
};
exports.Util = Util;

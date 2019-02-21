"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["DocIDError"] = "\u6587\u6863ID\u4E0D\u5408\u6CD5";
    ErrorCode["CollNameError"] = "\u96C6\u5408\u540D\u79F0\u4E0D\u5408\u6CD5";
    ErrorCode["OpStrError"] = "\u64CD\u4F5C\u7B26\u4E0D\u5408\u6CD5";
    ErrorCode["DirectionError"] = "\u6392\u5E8F\u5B57\u7B26\u4E0D\u5408\u6CD5";
    ErrorCode["IntergerError"] = "must be integer";
})(ErrorCode || (ErrorCode = {}));
exports.ErrorCode = ErrorCode;
const FieldType = {
    String: "String",
    Number: "Number",
    Object: "Object",
    Array: "Array",
    Boolean: "Boolean",
    Null: "Null",
    GeoPoint: "GeoPoint",
    GeoLineString: "GeoLineString",
    GeoPolygon: "GeoPolygon",
    GeoMultiPoint: "GeoMultiPoint",
    GeoMultiLineString: "GeoMultiLineString",
    GeoMultiPolygon: "GeoMultiPolygon",
    Timestamp: "Date",
    Command: "Command",
    ServerDate: "ServerDate"
};
exports.FieldType = FieldType;
const OrderDirectionList = ["desc", "asc"];
exports.OrderDirectionList = OrderDirectionList;
const WhereFilterOpList = ["<", "<=", "==", ">=", ">"];
exports.WhereFilterOpList = WhereFilterOpList;
var Opeartor;
(function (Opeartor) {
    Opeartor["lt"] = "<";
    Opeartor["gt"] = ">";
    Opeartor["lte"] = "<=";
    Opeartor["gte"] = ">=";
    Opeartor["eq"] = "==";
})(Opeartor || (Opeartor = {}));
exports.Opeartor = Opeartor;
const OperatorMap = {
    [Opeartor.eq]: "$eq",
    [Opeartor.lt]: "$lt",
    [Opeartor.lte]: "$lte",
    [Opeartor.gt]: "$gt",
    [Opeartor.gte]: "$gte"
};
exports.OperatorMap = OperatorMap;
const UpdateOperatorList = [
    "$set",
    "$inc",
    "$mul",
    "$unset",
    "$push",
    "$pop",
    "$unshift",
    "$shift",
    "$currentDate",
    "$each",
    "$position"
];
exports.UpdateOperatorList = UpdateOperatorList;

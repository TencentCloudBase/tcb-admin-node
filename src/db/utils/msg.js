"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function apiSuccessMsg(apiName) {
    return `${apiName}:ok`;
}
exports.apiSuccessMsg = apiSuccessMsg;
function apiCancelMsg(apiName, msg) {
    return `${apiName}:cancel ${msg}`;
}
exports.apiCancelMsg = apiCancelMsg;
function apiFailMsg(apiName, msg) {
    return `${apiName}:fail ${msg}`;
}
exports.apiFailMsg = apiFailMsg;

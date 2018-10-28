"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const type_1 = require("./type");
const reporter_1 = require("externals/public-lib/reporter");
function tryCatch(fn, customErrorStack = '') {
    try {
        const res = fn();
        return res;
    }
    catch (err) {
        if (error_1.isSDKError(err)) {
            err.errMsg += customErrorStack;
            return err;
        }
        const errMsg = (err ? err.toString() : '') + customErrorStack;
        return new error_1.CloudSDKError({
            errMsg,
        });
    }
}
exports.tryCatch = tryCatch;
function wrapWithTryCatch(fn, customErrorStack = '') {
    return function (...args) {
        return tryCatch(() => fn.apply(fn, args), customErrorStack);
    };
}
exports.wrapWithTryCatch = wrapWithTryCatch;
function wrapParamCallbacksWithTryCatch(options) {
    const param = options.param;
    if (!param)
        return;
    if (param.success && type_1.isFunction(param.success)) {
        param.success = reporter_1.default.surroundThirdByTryCatch(param.success, `at api ${options.apiName} success callback function`);
    }
    if (param.fail && type_1.isFunction(param.fail)) {
        param.fail = reporter_1.default.surroundThirdByTryCatch(param.fail, `at api ${options.apiName} fail callback function`);
    }
    if (param.complete && type_1.isFunction(param.complete)) {
        param.complete = reporter_1.default.surroundThirdByTryCatch(param.complete, `at api ${options.apiName} complete callback function`);
    }
}
exports.wrapParamCallbacksWithTryCatch = wrapParamCallbacksWithTryCatch;

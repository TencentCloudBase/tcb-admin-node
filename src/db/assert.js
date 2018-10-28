"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const error_1 = require("./error");
const error_config_1 = require("config/error.config");
function validType(input, ref, name = 'parameter') {
    function validTypeImpl(input, ref, name) {
        const inputType = type_1.getType(input);
        const refType = type_1.getType(ref);
        if (refType === 'string') {
            if (inputType !== ref) {
                return `${name} should be ${ref} instead of ${inputType};`;
            }
            return '';
        }
        else {
            if (inputType !== refType) {
                return `${name} should be ${refType} instead of ${inputType}; `;
            }
            let errors = '';
            switch (inputType) {
                case 'object': {
                    for (const key in ref) {
                        errors += validTypeImpl(input[key], ref[key], `${name}.${key}`);
                    }
                    break;
                }
                case 'array': {
                    for (let i = 0; i < ref.length; i++) {
                        errors += validTypeImpl(input[i], ref[i], `${name}[${i}]`);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            return errors;
        }
    }
    const error = validTypeImpl(input, ref, name);
    return {
        passed: !error,
        reason: error,
    };
}
exports.validType = validType;
function assertType(param, ref, name = 'parameter', ErrorClass = error_1.CloudSDKError) {
    const paramCheckResult = validType(param, ref, name);
    if (!paramCheckResult.passed) {
        throw new ErrorClass({
            errCode: error_config_1.ERR_CODE.SDK_API_PARAMETER_TYPE_ERROR,
            errMsg: paramCheckResult.reason,
        });
    }
}
exports.assertType = assertType;
function assertRequiredParam(param, name, funcName, ErrorClass = error_1.CloudSDKError) {
    if (param === undefined || param === null) {
        throw new ErrorClass({
            errCode: error_config_1.ERR_CODE.SDK_API_PARAMETER_ERROR,
            errMsg: `parameter ${name} of function ${funcName} must be provided`,
        });
    }
}
exports.assertRequiredParam = assertRequiredParam;
function assertStringLength({ name, input, max, maxWording = '', ErrorClass = error_1.CloudSDKError, }) {
    if (input.length > max) {
        throw new ErrorClass({
            errCode: error_config_1.ERR_CODE.SDK_API_PARAMETER_ERROR,
            errMsg: `${name} size must be less than ${maxWording || max}`,
        });
    }
}
exports.assertStringLength = assertStringLength;
function assertObjectNotEmpty({ target, name, ErrorClass = error_1.CloudSDKError, }) {
    if (Object.keys(target).length === 0) {
        throw new ErrorClass({
            errCode: error_config_1.ERR_CODE.SDK_API_PARAMETER_ERROR,
            errMsg: `${name} must not be empty`,
        });
    }
}
exports.assertObjectNotEmpty = assertObjectNotEmpty;

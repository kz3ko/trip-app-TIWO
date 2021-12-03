"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickParams = exports.requireParams = void 0;
// eslint-disable-next-line import/prefer-default-export
var requireParams = function (body) {
    var requiredParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        requiredParams[_i - 1] = arguments[_i];
    }
    var errors = 0;
    var errorObject = {};
    requiredParams.forEach(function (param) {
        if (!body[param]) {
            errorObject[param] = 'This field is required';
            errors += 1;
        }
    });
    return errors ? errorObject : null;
};
exports.requireParams = requireParams;
var pickParams = function (body) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var picked = {};
    params.forEach(function (param) {
        picked[param] = body[param];
    });
    return picked;
};
exports.pickParams = pickParams;

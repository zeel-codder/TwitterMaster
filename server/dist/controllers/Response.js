"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultLoader = exports.ErrorLoader = void 0;
var ErrorLoader = function (message, type) {
    var result = { message: message, type: type };
    return result;
};
exports.ErrorLoader = ErrorLoader;
var ResultLoader = function (message, data) {
    var result = { message: message, data: data };
    return result;
};
exports.ResultLoader = ResultLoader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropData = exports.DataLength = exports.ResultLoader = exports.ErrorLoader = void 0;
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
var DataLength = 10;
exports.DataLength = DataLength;
function CropData(List, number) {
    console.log(number - DataLength, number);
    return Array.from(List).slice(number - DataLength, number);
}
exports.CropData = CropData;

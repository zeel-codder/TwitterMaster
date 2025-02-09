"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserData = exports.GetNewUserList = exports.GetNewUser = void 0;
function GetNewUser(Tweet, name) {
    var _a;
    var data = Tweet._doc;
    return {
        _id: data._id,
        name: data.name,
        createdAt: data.createdAt,
        isFollow: (_a = data.followers) === null || _a === void 0 ? void 0 : _a.includes(name),
    };
}
exports.GetNewUser = GetNewUser;
function GetUserData(Tweet, name) {
    var data = Tweet._doc;
    return __assign(__assign({}, data), { password: '' });
}
exports.GetUserData = GetUserData;
function GetNewUserList(List, name) {
    return List.map(function (dataItem) {
        return GetNewUser(dataItem, name);
    });
}
exports.GetNewUserList = GetNewUserList;

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
exports.GetTweetData = exports.GetNewTweetList = exports.GetNewTweet = void 0;
function GetNewTweet(Tweet, name) {
    var _a, _b, _c;
    var data = Tweet._doc;
    return __assign(__assign({}, data), { isLike: (_a = data.like) === null || _a === void 0 ? void 0 : _a.includes(name), like: ((_b = data.like) === null || _b === void 0 ? void 0 : _b.length) || 0, comments: (_c = data.comments) === null || _c === void 0 ? void 0 : _c.slice(0, 2) });
}
exports.GetNewTweet = GetNewTweet;
function GetTweetData(Tweet, name) {
    var _a, _b;
    var data = Tweet._doc;
    return __assign(__assign({}, data), { isLike: (_a = data.like) === null || _a === void 0 ? void 0 : _a.includes(name), like: ((_b = data.like) === null || _b === void 0 ? void 0 : _b.length) || 0 });
}
exports.GetTweetData = GetTweetData;
function GetNewTweetList(List, name) {
    return List.map(function (dataItem) {
        return GetNewTweet(dataItem, name);
    });
}
exports.GetNewTweetList = GetNewTweetList;

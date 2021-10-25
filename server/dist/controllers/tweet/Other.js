"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveComment = exports.AddComment = exports.GetTweetsOfUser = exports.GetTweetsByIds = void 0;
var Schema_1 = require("../../database/Schema");
// import { Tweet } from '../../interface/database/Schema';
var Response_1 = require("../Response");
var GetTweetsByIds = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Ids_1, List, filter, TweetList, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Ids_1 = req.body.ids;
                return [4 /*yield*/, Schema_1.TweetModel.find({})];
            case 1:
                List = _a.sent();
                filter = List.filter(function (data) {
                    return Ids_1.includes(data._id.toString());
                });
                TweetList = Array.from(filter).reverse();
                // console.log(TweetList)
                res.status(200).send(Response_1.ResultLoader("All Tweet", TweetList));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                // console.log(e);
                res.status(404).send(Response_1.ErrorLoader("TweetList not found", e_1.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetTweetsByIds = GetTweetsByIds;
var GetTweetsOfUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, number, List, TweetList, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.params.name;
                number = +req.params.length;
                return [4 /*yield*/, Schema_1.TweetModel.find({ Creator_Name: name_1 }).limit(number).sort([['createdAt', -1]])];
            case 1:
                List = _a.sent();
                TweetList = List;
                console.log(List.length);
                if (List.length < number) {
                    res.status(200).send(Response_1.ResultLoader("All Tweet", { List: TweetList, isEnd: true }));
                }
                res.status(200).send(Response_1.ResultLoader("All Tweet", { List: TweetList, isEnd: false }));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                //console.log(e);
                res.status(404).send(Response_1.ErrorLoader("TweetList not found", e_2.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetTweetsOfUser = GetTweetsOfUser;
var AddComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, title, Tweet, TweetData, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, _id = _a._id, title = _a.title;
                return [4 /*yield*/, Schema_1.TweetModel.findOne({ _id: _id })];
            case 1:
                Tweet = _b.sent();
                if (!Tweet.comments) {
                    Tweet.comments = [];
                }
                Tweet.comments.push({ title: title, Creator_Name: req.user_name });
                return [4 /*yield*/, Tweet.save()];
            case 2:
                TweetData = _b.sent();
                res.status(200).send(Response_1.ResultLoader("All Tweet", TweetData._doc));
                return [3 /*break*/, 4];
            case 3:
                e_3 = _b.sent();
                // console.log(e);
                res.status(404).send(Response_1.ErrorLoader("TweetList not found", e_3.message));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AddComment = AddComment;
var RemoveComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, comment_id_1, Tweet, index, TweetData, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, _id = _a._id, comment_id_1 = _a.comment_id;
                return [4 /*yield*/, Schema_1.TweetModel.findOne({ _id: _id })];
            case 1:
                Tweet = _b.sent();
                if (!Tweet.comments) {
                    Tweet.comments = [];
                }
                index = Tweet.comments.findIndex(function (data) { return data._id.toString() === comment_id_1; });
                if (index === -1) {
                    return [2 /*return*/, res.status(404).send(Response_1.ErrorLoader("Some Error", "null"))];
                }
                Tweet.comments.splice(index, 1);
                return [4 /*yield*/, Tweet.save()];
            case 2:
                TweetData = _b.sent();
                res.status(200).send(Response_1.ResultLoader("Tweet", TweetData._doc));
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                // console.log(e);
                res.status(404).send(Response_1.ErrorLoader("TweetList not found", e_4.message));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.RemoveComment = RemoveComment;

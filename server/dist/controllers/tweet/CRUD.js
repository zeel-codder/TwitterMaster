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
exports.GetTweet = exports.UpdateTweet = exports.DeleteTweet = exports.AddTweet = exports.GetTweets = void 0;
var Schema_1 = require("../../database/Schema");
var Helper_1 = require("../Helper");
var CRUD_1 = require("../group/CRUD");
var Helper_2 = require("./Helper");
var Media_1 = require("../Media");
var GetTweets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, number, List, TweetList, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.user_id;
                number = +req.params.length;
                return [4 /*yield*/, Schema_1.TweetModel.find({}).sort([['createdAt', -1]]).limit(number)];
            case 1:
                List = _a.sent();
                TweetList = Helper_1.CropData(List, number);
                TweetList = Helper_2.GetNewTweetList(TweetList, name_1);
                console.log(number, TweetList.length, List.length);
                if (List.length < number) {
                    return [2 /*return*/, res.status(200).send(Helper_1.ResultLoader("All Tweet", { List: TweetList, isEnd: true }))];
                }
                res.status(200).send(Helper_1.ResultLoader("All Tweet", { List: TweetList, isEnd: false }));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                // console.log(e);
                res.status(404).send(Helper_1.ErrorLoader("TweetList not found", e_1.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetTweets = GetTweets;
var GetTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, Tweet, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.params._id;
                return [4 /*yield*/, Schema_1.TweetModel.findOne({ _id: _id })];
            case 1:
                Tweet = _a.sent();
                if (Tweet === null) {
                    return [2 /*return*/, res.status(404).send(Helper_1.ErrorLoader("Tweet Not Found", "Not Found"))];
                }
                res.status(200).send(Helper_1.ResultLoader("Tweet", Helper_2.GetTweetData(Tweet, req.user_id)));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(404).send(Helper_1.ErrorLoader("Tweet not found", e_2.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetTweet = GetTweet;
var AddTweet = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Tweet, newTweet, newDoc, newTweetData_1, groups, listGroup_1, GroupList, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                Tweet = req.body;
                if (!Tweet) {
                    return [2 /*return*/, res.status(500).send(Helper_1.ErrorLoader("Invalid Input", "Input"))];
                }
                newTweet = {
                    description: Tweet.description,
                    groups: Tweet.groups,
                    url: Tweet.url,
                };
                newTweet.Creator_ID = req.user_id;
                newTweet.Creator_Name = req.user_name;
                if (Tweet.media) {
                    if (Tweet.isImage) {
                        newTweet.image = Tweet.media;
                        newTweet.public_id_media = Tweet.public_id_media;
                    }
                    else {
                        newTweet.video = Tweet.media;
                        newTweet.public_id_media = Tweet.public_id_media;
                    }
                }
                newDoc = new Schema_1.TweetModel(newTweet);
                return [4 /*yield*/, newDoc.save()];
            case 1:
                newTweetData_1 = _a.sent();
                res.status(200).send(Helper_1.ResultLoader("Tweet Added", null));
                groups = newTweet.groups;
                listGroup_1 = groups === null || groups === void 0 ? void 0 : groups.split("|");
                return [4 /*yield*/, CRUD_1.GetGroupList()];
            case 2:
                GroupList = _a.sent();
                // console.log(GroupList,listGroup);
                GroupList.forEach(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(listGroup_1 === null || listGroup_1 === void 0 ? void 0 : listGroup_1.includes(data.title))) return [3 /*break*/, 2];
                                // console.log("add")
                                data.tweets.push(newTweetData_1._id);
                                return [4 /*yield*/, data.save()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                console.log(listGroup_1);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                res.status(404).send(Helper_1.ErrorLoader(e_3.message, "Error"));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AddTweet = AddTweet;
var DeleteTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, TweetDelete_1, public_id_media, TweetDeleteData, listGroup_2, GroupList, e_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _id = req.body._id;
                return [4 /*yield*/, Schema_1.TweetModel.findOne({ _id: _id })];
            case 1:
                TweetDelete_1 = _b.sent();
                public_id_media = TweetDelete_1.public_id_media;
                Media_1.cloudinary.uploader.destroy(public_id_media, function (result) { console.log(result); });
                return [4 /*yield*/, Schema_1.TweetModel.deleteOne({ _id: _id })];
            case 2:
                TweetDeleteData = _b.sent();
                res.status(200).send(Helper_1.ResultLoader("Tweets Deleted", TweetDeleteData));
                listGroup_2 = (_a = TweetDelete_1.groups) === null || _a === void 0 ? void 0 : _a.split("|");
                return [4 /*yield*/, CRUD_1.GetGroupList()];
            case 3:
                GroupList = _b.sent();
                GroupList === null || GroupList === void 0 ? void 0 : GroupList.forEach(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (data === '')
                                    return [2 /*return*/];
                                if (!(listGroup_2 === null || listGroup_2 === void 0 ? void 0 : listGroup_2.includes(data.title))) return [3 /*break*/, 2];
                                data.tweets.splice(data.tweets.indexOf(TweetDelete_1._id), 1);
                                return [4 /*yield*/, data.save()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 5];
            case 4:
                e_4 = _b.sent();
                res.status(404).send(Helper_1.ErrorLoader("TweetList not found", e_4.message));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.DeleteTweet = DeleteTweet;
var UpdateTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, before, after, _id, user_id, type, newTweet, Tweet, _b, e_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 13, , 14]);
                _a = req.body, before = _a.before, after = _a.after;
                _id = before._id, user_id = before.user_id, type = before.type;
                newTweet = after;
                return [4 /*yield*/, Schema_1.TweetModel.findOne({ _id: _id })];
            case 1:
                Tweet = _c.sent();
                if (Tweet == null) {
                    res.status(404).send(Helper_1.ErrorLoader("Tweet Not Found", Tweet));
                }
                _b = type;
                switch (_b) {
                    case "like": return [3 /*break*/, 2];
                    case "retweet": return [3 /*break*/, 4];
                    case "remove like": return [3 /*break*/, 6];
                    case "any": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 11];
            case 2:
                Tweet.like.push(user_id);
                return [4 /*yield*/, Tweet.save()];
            case 3:
                _c.sent();
                return [3 /*break*/, 12];
            case 4:
                Tweet.retweet++;
                return [4 /*yield*/, Tweet.save()];
            case 5:
                _c.sent();
                return [3 /*break*/, 12];
            case 6:
                Tweet.like.pull(user_id);
                return [4 /*yield*/, Tweet.save()];
            case 7:
                _c.sent();
                return [3 /*break*/, 12];
            case 8: return [4 /*yield*/, Schema_1.TweetModel.findOneAndUpdate({ _id: _id }, newTweet)];
            case 9:
                _c.sent();
                return [4 /*yield*/, Schema_1.TweetModel.findOne({ _id: _id })];
            case 10:
                Tweet = _c.sent();
                return [3 /*break*/, 12];
            case 11: return [2 /*return*/, res.status(500).send(Helper_1.ErrorLoader("Invalid Input", "Input"))];
            case 12:
                console.log(Tweet);
                res.status(200).send(Helper_1.ResultLoader("Tweets Updated", Helper_2.GetNewTweet(Tweet, req.user_id)));
                return [3 /*break*/, 14];
            case 13:
                e_5 = _c.sent();
                //console.log(e);
                res.status(404).send(Helper_1.ErrorLoader("TweetList not found", e_5.message));
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.UpdateTweet = UpdateTweet;

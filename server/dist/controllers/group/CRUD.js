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
exports.GetGroupsAll = exports.GetGroupList = exports.GetGroup = exports.UpdateGroup = exports.DeleteGroup = exports.AddGroup = exports.GetGroups = void 0;
var Schema_1 = require("../../database/Schema");
var Helper_1 = require("../Helper");
var GetGroupList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var GroupList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Schema_1.GroupModel.find({})];
            case 1:
                GroupList = _a.sent();
                GroupList = Array.from(GroupList).reverse();
                return [2 /*return*/, GroupList];
        }
    });
}); };
exports.GetGroupList = GetGroupList;
var GetGroupsAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var List, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, GetGroupList()];
            case 1:
                List = _a.sent();
                res.status(200).send(Helper_1.ResultLoader("All Tweet", List));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(404).send(Helper_1.ErrorLoader("GroupList not found", e_1.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetGroupsAll = GetGroupsAll;
var GetGroups = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var number, Params, List, TweetList, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                number = +req.params.length;
                Params = '_id title description createdAt updatedAt';
                return [4 /*yield*/, Schema_1.GroupModel.find({}, Params).sort([['createdAt', -1]]).limit(number)];
            case 1:
                List = _a.sent();
                TweetList = Helper_1.CropData(List, number);
                if (List.length < number) {
                    res.status(200).send(Helper_1.ResultLoader("All Groups", { List: TweetList, isEnd: true }));
                }
                res.status(200).send(Helper_1.ResultLoader("All Tweet", { List: TweetList, isEnd: false }));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(404).send(Helper_1.ErrorLoader("GroupList not found", e_2.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetGroups = GetGroups;
var GetGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, Group, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.params.name;
                return [4 /*yield*/, Schema_1.GroupModel.findOne({ title: name_1 }, '_id title description createdAt')];
            case 1:
                Group = _a.sent();
                if (Group === null) {
                    return [2 /*return*/, res.status(404).send(Helper_1.ErrorLoader("Group Not Found", "Not Found"))];
                }
                res.status(200).send(Helper_1.ResultLoader("Group", Group));
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(404).send(Helper_1.ErrorLoader("Group not found", e_3.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetGroup = GetGroup;
var AddGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newGroup, GroupFind, newDoc, Group, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newGroup = req.body;
                if (!newGroup) {
                    return [2 /*return*/, res.status(500).send(Helper_1.ErrorLoader("Invalid Input", "Input"))];
                }
                return [4 /*yield*/, Schema_1.GroupModel.findOne({ title: newGroup.title })];
            case 1:
                GroupFind = _a.sent();
                if (GroupFind) {
                    return [2 /*return*/, res.status(500).send(Helper_1.ErrorLoader("Invalid Input", "Input"))];
                }
                newGroup = __assign({ users: [], tweets: [] }, newGroup);
                newDoc = new Schema_1.GroupModel(newGroup);
                return [4 /*yield*/, newDoc.save()];
            case 2:
                Group = _a.sent();
                res.status(200).send(Helper_1.ResultLoader("Group Added", Group));
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(404).send(Helper_1.ErrorLoader(e_4.message, "Error"));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AddGroup = AddGroup;
var DeleteGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, GroupDelete, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.body._id;
                return [4 /*yield*/, Schema_1.GroupModel.deleteOne({ _id: _id })];
            case 1:
                GroupDelete = _a.sent();
                res.status(200).send(Helper_1.ResultLoader("Groups Deleted", GroupDelete));
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(404).send(Helper_1.ErrorLoader("GroupList not found", e_5.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteGroup = DeleteGroup;
var UpdateGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, before, after, _id, user_id, type, newGroup, Group, _b, e_6;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 13, , 14]);
                _a = req.body, before = _a.before, after = _a.after;
                _id = before._id, user_id = before.user_id, type = before.type;
                newGroup = after;
                return [4 /*yield*/, Schema_1.GroupModel.findOne({ _id: _id })];
            case 1:
                Group = _c.sent();
                _b = type;
                switch (_b) {
                    case "admin": return [3 /*break*/, 2];
                    case "users": return [3 /*break*/, 4];
                    case "remove users": return [3 /*break*/, 6];
                    case "any": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 11];
            case 2:
                Group.admin.push(user_id);
                return [4 /*yield*/, Group.save()];
            case 3:
                _c.sent();
                return [3 /*break*/, 12];
            case 4:
                Group.users.push(user_id);
                return [4 /*yield*/, Group.save()];
            case 5:
                _c.sent();
                return [3 /*break*/, 12];
            case 6:
                Group.users.pull(user_id);
                return [4 /*yield*/, Group.save()];
            case 7:
                _c.sent();
                return [3 /*break*/, 12];
            case 8: return [4 /*yield*/, Schema_1.GroupModel.findOneAndUpdate({ _id: _id }, newGroup)];
            case 9:
                _c.sent();
                return [4 /*yield*/, Schema_1.GroupModel.findOne({ _id: _id })];
            case 10:
                Group = _c.sent();
                return [3 /*break*/, 12];
            case 11: return [2 /*return*/, res.status(500).send(Helper_1.ErrorLoader("Invalid Input", "Input"))];
            case 12:
                if (Group == null) {
                    res.status(404).send(Helper_1.ErrorLoader("Group Not Found", Group));
                }
                res.status(200).send(Helper_1.ResultLoader("Groups Updated", Group));
                return [3 /*break*/, 14];
            case 13:
                e_6 = _c.sent();
                res.status(404).send(Helper_1.ErrorLoader("GroupList not found", e_6.message));
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.UpdateGroup = UpdateGroup;

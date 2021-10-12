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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingIn = exports.GetUser = exports.UpdateUser = exports.DeleteUser = exports.AddUser = exports.GetUsers = void 0;
var Schema_1 = require("../../database/Schema");
var Response_1 = require("../Response");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var GetUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var UserList, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Schema_1.UserModel.find({})];
            case 1:
                UserList = _a.sent();
                res.status(200).send(Response_1.ResultLoader("All Users", UserList));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(404).send(Response_1.ErrorLoader("UserList not found", e_1.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUsers = GetUsers;
var GetUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, User, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.params.name;
                console.log(name_1);
                return [4 /*yield*/, Schema_1.UserModel.findOne({ name: name_1 })];
            case 1:
                User = _a.sent();
                if (User === null) {
                    return [2 /*return*/, res.sendStatus(500)];
                }
                res.status(200).send(Response_1.ResultLoader("User", User));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(404).send(Response_1.ErrorLoader("User not found", e_2.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUser = GetUser;
var AddUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, findByName, findByEmail, hash, newDoc, user, token, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                newUser = req.body;
                console.log(newUser);
                if (!newUser || !newUser.name || !newUser.email) {
                    // const error: ErrorSchema = {
                    //     message: "Invalid Input",
                    //     type: "Input",
                    // }
                    return [2 /*return*/, res.status(500).send(Response_1.ErrorLoader("Invalid Input", "Input"))];
                }
                return [4 /*yield*/, Schema_1.UserModel.findOne({ name: newUser.name })];
            case 1:
                findByName = _a.sent();
                return [4 /*yield*/, Schema_1.UserModel.findOne({ email: newUser.email })];
            case 2:
                findByEmail = _a.sent();
                if (findByName || findByEmail) {
                    // throw new Error("User Name and Email Exits");
                    return [2 /*return*/, res.status(500).send(Response_1.ErrorLoader("User Name and Email Exits", "UserFound"))];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(newUser.password || "", 10)];
            case 3:
                hash = _a.sent();
                newUser = __assign(__assign({ image: '', follow: [], followers: [] }, newUser), { password: hash });
                newDoc = new Schema_1.UserModel(newUser);
                return [4 /*yield*/, newDoc.save()];
            case 4:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign(JSON.stringify(user), process.env.Secrete || "");
                result = {
                    message: "User Added",
                    data: { name: user.name, id: user._id, token: token, email: user.email },
                };
                res.status(200).send(result);
                return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                // const error: ErrorSchema = {
                //     message: "User Found",
                //     type: e.message
                // }
                res.status(404).send(Response_1.ErrorLoader(e_3.message, "Error"));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.AddUser = AddUser;
var SingIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, password, findByName, isPasswordSame, token, result, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                console.log('call');
                _a = req.body, name_2 = _a.name, password = _a.password;
                // console.log(newUser);
                if (!name_2) {
                    // const error: ErrorSchema = {
                    //     message: "Invalid Input",
                    //     type: "Input",
                    // }
                    return [2 /*return*/, res.status(500).send(Response_1.ErrorLoader("Invalid Input", "Input"))];
                }
                return [4 /*yield*/, Schema_1.UserModel.findOne({ name: name_2 })];
            case 1:
                findByName = _b.sent();
                if (!findByName) {
                    // throw new Error("User Name and Email Exits");
                    return [2 /*return*/, res.status(500).send(Response_1.ErrorLoader("User Not Exits", "UserNotFound"))];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, findByName.password)];
            case 2:
                isPasswordSame = _b.sent();
                if (!isPasswordSame) {
                    return [2 /*return*/, res.status(401).send(Response_1.ErrorLoader("PassWord Wrong", "UserNotFound"))];
                }
                token = jsonwebtoken_1.default.sign(JSON.stringify(findByName), process.env.Secrete);
                result = {
                    message: "User fount",
                    data: { name: findByName.name, _id: findByName._id, token: token, email: findByName.email },
                };
                res.status(200).send(result);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                console.log(e_4);
                res.status(404).send(Response_1.ErrorLoader(e_4.message, "Error"));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.SingIn = SingIn;
var DeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_3, UserDelete, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_3 = req.body.name;
                return [4 /*yield*/, Schema_1.UserModel.deleteOne({ name: name_3 })];
            case 1:
                UserDelete = _a.sent();
                res.status(200).send(Response_1.ResultLoader("Users Deleted", UserDelete));
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(404).send(Response_1.ErrorLoader("UserList not found", e_5.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteUser = DeleteUser;
var UpdateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, before, after, name_4, newUser, UserDelete, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, before = _a.before, after = _a.after;
                name_4 = before.name;
                newUser = after;
                return [4 /*yield*/, Schema_1.UserModel.findOneAndUpdate({ name: name_4 }, newUser)];
            case 1:
                UserDelete = _b.sent();
                res.status(200).send(Response_1.ResultLoader("Users Updated", UserDelete));
                return [3 /*break*/, 3];
            case 2:
                e_6 = _b.sent();
                res.status(404).send(Response_1.ErrorLoader("UserList not found", e_6.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUser = UpdateUser;

"use strict";
//get email
// get that user
// give the password refresh link
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
exports.SendPassWordResetLink = void 0;
var Schema_1 = require("../../database/Schema");
var Helper_1 = require("../Helper");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var emailjs_1 = require("emailjs");
var SendPassWordResetLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, findByEmail, user, token, client, message, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, Schema_1.UserModel.findOne({ email: email })];
            case 1:
                findByEmail = _a.sent();
                if (!findByEmail) {
                    throw new Error("In valid Email");
                }
                user = { data: findByEmail, isReset: true };
                token = jsonwebtoken_1.default.sign(JSON.stringify(user), process.env.JWT_SECRET || "");
                return [4 /*yield*/, new emailjs_1.SMTPClient({
                        user: process.env.EMAIL,
                        password: process.env.EMAIL_PASSWORD,
                        host: "smtp.gmail.com",
                        ssl: true,
                    })];
            case 2:
                client = _a.sent();
                message = new emailjs_1.Message({
                    from: process.env.EMAIL,
                    to: email,
                    subject: "password Reset",
                    attachment: [
                        {
                            data: "<h2>HI, Your Password Reset Info For TwitterMaster </h2>\n                     <h2> UserName:" + findByEmail.name + "</h2>\n                     <h3>Link: <a href=\"" + process.env.WEBSITE_LINK + "/password_reset/" + token + "\"> hear</a> </h3>\n                     ",
                            alternative: true,
                        },
                    ],
                });
                return [4 /*yield*/, client.sendAsync(message)];
            case 3:
                _a.sent();
                res.status(200).send(Helper_1.ResultLoader("Done", "Send"));
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(404).send(Helper_1.ErrorLoader("Email not found", e_1.message));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.SendPassWordResetLink = SendPassWordResetLink;

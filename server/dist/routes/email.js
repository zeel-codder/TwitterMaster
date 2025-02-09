"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AuthEmail_1 = require("../controllers/email/AuthEmail");
var router = express_1.default.Router();
router.post('/password_reset', AuthEmail_1.SendPassWordResetLink);
exports.default = router;

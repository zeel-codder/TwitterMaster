"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.cloudinary = void 0;
var multer_1 = __importDefault(require("multer"));
var cloudinary = require('cloudinary').v2;
exports.cloudinary = cloudinary;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_Api_Name,
    api_key: process.env.CLOUDINARY_Api_Key,
    api_secret: process.env.CLOUDINARY_Api_Key_S,
    secure: true
});
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, "./" + process.env.upload + "/files");
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, new Date().toISOString() + file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
var upload = multer_1.default({ storage: storage });
exports.upload = upload;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = exports.TweetModel = exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var UserSchema = new Schema({
    name: String,
    email: String,
    image: String,
    password: String,
    followers: [{ type: String }],
    follow: [{ type: String }]
}, { versionKey: false, timestamps: true });
var TweetSchema = new Schema({
    title: String,
    description: String,
    like: [{ type: String }],
    retweet: Number,
    explore: [{ type: String }],
    image: String,
    video: String,
    Creator_ID: String,
    Creator_Name: String,
    groups: String,
    comments: [{ title: String, Creator_Name: String }],
    url: String
}, { versionKey: false, timestamps: true });
var GroupSchema = new Schema({
    title: String,
    description: String,
    users: [{ type: String }],
    tweets: [{ type: String }],
}, { versionKey: false, timestamps: true });
var UserModel = model('User', UserSchema);
exports.UserModel = UserModel;
var TweetModel = model('Tweet', TweetSchema);
exports.TweetModel = TweetModel;
var GroupModel = model('Group', GroupSchema);
exports.GroupModel = GroupModel;

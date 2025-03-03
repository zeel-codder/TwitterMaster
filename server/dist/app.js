"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
require('dotenv').config();
require('./database/Connection');
var user_1 = __importDefault(require("./routes/user"));
var group_1 = __importDefault(require("./routes/group"));
var email_1 = __importDefault(require("./routes/email"));
var cors = require('cors');
// var fs = require('fs');
// var dir = `./${process.env.upload}/files`;
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }
if (process.env.NODE_ENV === 'production') {
    console.log = function () { };
}
var tweet_1 = __importDefault(require("./routes/tweet"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
app.use(cors());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))/
// parse application/json
app.use(express_1.default.json());
// console.log();
app.use('/files', express_1.default.static(path_1.default.join(__dirname, 'files')));
var port = process.env.PORT || 3001;
app.get('/', function (req, res) {
    res.send('Hello Zeel');
});
app.use('/user', user_1.default);
app.use('/group', group_1.default);
app.use('/tweet', tweet_1.default);
app.use('/email', email_1.default);
app.listen(port, function () {
    console.log("App is listening on port " + port + " !");
});
module.exports = app;

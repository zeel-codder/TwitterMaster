"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CRUD_1 = require("../controllers/tweet/CRUD");
var Auth_1 = require("../middlewares/Auth");
var router = express_1.default.Router();
// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// console.log('tweet')
var multer_1 = __importDefault(require("multer"));
var Other_1 = require("../controllers/tweet/Other");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, "./" + process.env.upload + "/files");
        // cb(null, path.join('../files'))
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, new Date().toISOString() + file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
var upload = multer_1.default({ storage: storage });
router.get('/', function (req, res) {
    CRUD_1.GetTweets(req, res);
});
router.post('/tweetsbyid', Other_1.GetTweetsByIds);
router.post('/create', Auth_1.Auth, upload.single('media'), CRUD_1.AddTweet);
router.delete('/delete', function (req, res) {
    CRUD_1.DeleteTweet(req, res);
});
router.put('/update', Auth_1.Auth, CRUD_1.UpdateTweet);
router.get('/:_id', function (req, res) {
    CRUD_1.GetTweet(req, res);
});
exports.default = router;

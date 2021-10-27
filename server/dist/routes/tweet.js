"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CRUD_1 = require("../controllers/tweet/CRUD");
var Other_1 = require("../controllers/tweet/Other");
var Auth_1 = require("../middlewares/Auth");
var router = express_1.default.Router();
var Other_2 = require("../controllers/tweet/Other");
// import multer  from 'multer';
// const storage = multer.diskStorage({
//     destination: function (req:Request, file:any, cb:Function) {
//       // console.log(file);
//       cb(null, `./${process.env.upload}/files`)
//       // cb(null, path.join('../files'))
//     },
//     filename: function (req:Request, file:any, cb:Function) {
//       const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null,  new Date().toISOString() + file.originalname);
//       // cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })
// const upload = multer({ storage: storage })
router.get('/all/:length', Auth_1.Auth, CRUD_1.GetTweets);
router.post('/tweetsbyid', Auth_1.Auth, Other_2.GetTweetsByIds);
router.get('/user/:name/:length', Auth_1.Auth, Other_1.GetTweetsOfUser);
router.post('/create', Auth_1.Auth, CRUD_1.AddTweet);
router.post('/delete', Auth_1.Auth, CRUD_1.DeleteTweet);
router.put('/update', Auth_1.Auth, CRUD_1.UpdateTweet);
router.post("/add_comment", Auth_1.Auth, Other_1.AddComment);
router.post("/remove_comment", Auth_1.Auth, Other_1.RemoveComment);
router.get('/:_id', Auth_1.Auth, CRUD_1.GetTweet);
exports.default = router;

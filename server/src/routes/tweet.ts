import express, { Router, Request, Response } from "express";
import { GetTweets, AddTweet, DeleteTweet, UpdateTweet, GetTweet } from "../controllers/tweet/CRUD";

import { AddComment, GetTweetsOfUser, RemoveComment } from "../controllers/tweet/Other";
import {Auth} from '../middlewares/Auth';
var router: Router = express.Router()

import { GetTweetsByIds } from "../controllers/tweet/Other";

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



router.get('/all/:length',Auth,GetTweets)
router.post('/tweetsbyid',Auth,GetTweetsByIds);
router.get('/user/:name/:length',Auth,GetTweetsOfUser);
router.post('/create',Auth,AddTweet)
router.post('/delete', Auth,DeleteTweet)
router.put('/update',Auth,UpdateTweet)
router.post("/add_comment",Auth,AddComment);
router.post("/remove_comment",Auth,RemoveComment);
router.get('/:_id',Auth,GetTweet)


export default router;



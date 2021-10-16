import express, { Router, Request, Response } from "express";
import { GetTweets, AddTweet, DeleteTweet, UpdateTweet, GetTweet } from "../controllers/tweet/CRUD";

import { GetTweetsOfUser } from "../controllers/tweet/Other";
import {Auth} from '../middlewares/Auth';
var router: Router = express.Router()


import multer  from 'multer';
import path from "path";
import { GetTweetsByIds } from "../controllers/tweet/Other";

const storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:Function) {

      // console.log(file);
      cb(null, `./${process.env.upload}/files`)
      // cb(null, path.join('../files'))
    },
    filename: function (req:Request, file:any, cb:Function) {
      const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  new Date().toISOString() + file.originalname);
      // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })



router.get('/', GetTweets)
router.post('/tweetsbyid',GetTweetsByIds);
router.get('/user/:name',GetTweetsOfUser);
router.post('/create',Auth,upload.single('media'),AddTweet)
router.post('/delete', Auth,DeleteTweet)
router.put('/update',Auth,UpdateTweet)
router.get('/:_id',GetTweet)

export default router;



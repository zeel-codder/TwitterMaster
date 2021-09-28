import express, { Router, Request, Response } from "express";
import { GetTweets, AddTweet, DeleteTweet, UpdateTweet, GetTweet } from "../controllers/tweet/CRUD";

var router: Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// console.log('tweet')

import multer  from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:Function) {

      console.log(file);
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



router.get('/', function (req: Request, res: Response) {
  GetTweets(req, res);
})




router.post('/create',upload.single('media'),AddTweet)




router.delete('/delete', function (req: Request, res: Response) {
  DeleteTweet(req, res);
})



router.put('/update', function (req: Request, res: Response) {
  UpdateTweet(req, res);
})


router.get('/:_id', function (req: Request, res: Response) {
  GetTweet(req, res);
})


export default router;



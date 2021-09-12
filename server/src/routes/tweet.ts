import express, { Router, Request, Response } from "express";
import { GetTweets, AddTweet, DeleteTweet, UpdateTweet, GetTweet } from "../controllers/tweet/CRUD";

var router: Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// console.log('tweet')



router.get('/', function (req: Request, res: Response) {
  GetTweets(req, res);
})




router.post('/create', function (req: Request, res: Response) {
  AddTweet(req, res);
})




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



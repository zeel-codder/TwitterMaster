import express, { Router, Request, Response } from "express";
import { GetExplores, AddExplore, DeleteExplore, UpdateExplore, GetExplore } from '../controllers/explore/CRUD'

var router: Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })


// console.log('explore')


router.get('/', function (req: Request, res: Response) {
  GetExplores(req, res);
})



router.post('/create', function (req: Request, res: Response) {
  AddExplore(req, res);
})



router.delete('/delete', function (req: Request, res: Response) {
  DeleteExplore(req, res);
})


router.put('/update', function (req: Request, res: Response) {
  UpdateExplore(req, res);
})




router.get('/:_id', function (req: Request, res: Response) {
  GetExplore(req, res);
})


export default router;
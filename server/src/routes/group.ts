import express, { Router, Request, Response } from "express";
import { GetGroups, AddGroup, DeleteGroup, UpdateGroup, GetGroup } from '../controllers/group/CRUD'

var router: Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

console.log('group')


router.get('/', function (req: Request, res: Response) {
  GetGroups(req, res);
})





router.post('/create', function (req: Request, res: Response) {
  AddGroup(req, res);
})





router.delete('/delete', function (req: Request, res: Response) {
  DeleteGroup(req, res);
})



router.put('/update', function (req: Request, res: Response) {
  UpdateGroup(req, res);
})


router.get('/:_id', function (req: Request, res: Response) {
  GetGroup(req, res);
})




export default router;
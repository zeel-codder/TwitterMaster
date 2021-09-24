import express, { Router, Request, Response } from "express";
// import {UserModel} from '../database/Schema';
import { GetUsers, AddUser, UpdateUser, DeleteUser, GetUser,SingIn } from '../controllers/user/CRUD';
import { Auth } from "../middlewares/Auth";

var router: Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// console.log('User');



router.get('/',function (req: Request, res: Response) {


  GetUsers(req, res);



})




router.post('/create', function (req: Request, res: Response) {


  AddUser(req, res);



})




router.delete('/delete', function (req: Request, res: Response) {
  DeleteUser(req, res);
})


router.post('/singin', function (req: Request, res: Response) {
  SingIn(req, res);
})





router.put('/update', function (req: Request, res: Response) {
  UpdateUser(req, res);
})




router.get('/verify/:id', function (req: Request, res: Response) {
  res.send('Birds home page')
})


router.get('/:name', function (req: Request, res: Response) {
  GetUser(req, res);
})


export default router;




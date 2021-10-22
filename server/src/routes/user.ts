import express, { Router, Request, Response } from "express";
// import {UserModel} from '../database/Schema';
import { GetUsers, AddUser, UpdateUser, DeleteUser, GetUser, SingIn } from '../controllers/user/CRUD';
import { Auth } from "../middlewares/Auth";
import { UserFollow } from "../controllers/user/Other";

var router: Router = express.Router()




router.get('/all/:length',Auth,GetUsers)
router.post('/create', AddUser)
router.delete('/delete', DeleteUser)
router.post('/singin', SingIn)
router.put('/update', UpdateUser)
router.get('/:name', GetUser)
router.post('/follow',Auth,UserFollow);
router.get('/verify/:id', function (req: Request, res: Response) {
  res.send('Birds home page')
})

export default router;




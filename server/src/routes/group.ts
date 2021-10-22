import express, { Router, Request, Response } from "express";
import { GetGroups, AddGroup, DeleteGroup, UpdateGroup, GetGroup, GetGroupsAll } from '../controllers/group/CRUD'
import { Auth } from "../middlewares/Auth";

var router: Router = express.Router()



router.get('/all/:length',Auth,GetGroups)
router.get('/allgroups',GetGroupsAll);
router.post('/create',Auth,AddGroup)
router.delete('/delete',Auth, DeleteGroup)
router.put('/update', Auth , UpdateGroup)
router.get('/:_id',GetGroup)




export default router;
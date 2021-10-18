import express, { Router} from "express";

import { SendPassWordResetLink } from "../controllers/email/AuthEmail";

var router: Router = express.Router()


router.post('/password_reset',SendPassWordResetLink)



export default router;
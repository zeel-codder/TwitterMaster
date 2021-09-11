import  express, { Router,Request,Response} from "express";
// import {UserModel} from '../database/Schema';
import {GetUsers,AddUser,UpdateUser,DeleteUser,GetUser} from '../controllers/user/CRUD';


var router:Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// console.log('User');

/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @return  Function returns List of All User
 */


 router.get('/', function (req :Request, res :Response) {

   
   GetUsers(req,res);
  

    
  })


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Add New User
 * @return  Response
 */


router.post('/create', function (req :Request, res :Response) {
 

    AddUser(req,res);

  

})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Remove  User
 * @return  Response
 */


router.delete('/delete', function (req :Request, res :Response) {
   DeleteUser(req,res);
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Update  User
 * @return  Response
 */


router.put('/update', function (req :Request, res :Response) {
  UpdateUser(req,res);
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Use to verify the user Email
 * @return  Response
 */


router.get('/verify/:id', function (req :Request, res :Response) {
  res.send('Birds home page')
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Use to get user by name
 * @return  Response
 */


 router.get('/:name', function (req :Request, res :Response) {
     GetUser(req,res);
 })
  

 export default router;
  



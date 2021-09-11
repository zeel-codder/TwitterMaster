import  express, { Router,Request,Response} from "express";

var router:Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

console.log('group')

/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @return  Function returns List of All Groups
 */


 router.get('/', function (req :Request, res :Response) {
    res.send('Birds home page')
  })


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Add New Group
 * @return  Response
 */


router.post('/Group', function (req :Request, res :Response) {
  res.send('Birds home page')
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Remove  Group by id
 * @return  Response
 */


router.delete('/delete', function (req :Request, res :Response) {
  res.send('Birds home page')
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Update  Group by id
 * @return  Response
 */


router.put('/update', function (req :Request, res :Response) {
  res.send('Birds home page')
})



/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Use to get Group by name
 * @return  Response
 */


 router.get('/:name', function (req :Request, res :Response) {
    res.send('Birds home page')
 })
  
  


export default router;
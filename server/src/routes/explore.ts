import  express, { Router,Request,Response} from "express";

var router:Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })


console.log('explore')

/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @return  Function returns List of All Explores
 */


 router.get('/', function (req :Request, res :Response) {
    res.send('Birds home page')
  })


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Add New Explore
 * @return  Response
 */


router.post('/Explore', function (req :Request, res :Response) {
  res.send('Birds home page')
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Remove  Explore by id
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
 * @use Function Update  Explore by id
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
 * @use Function Use to get Explore by name
 * @return  Response
 */


 router.get('/:name', function (req :Request, res :Response) {
    res.send('Birds home page')
 })
  

export default router;
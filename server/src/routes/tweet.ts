import  express, { Router,Request,Response} from "express";

var router:Router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

console.log('tweet')

/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @return  Function returns List of All Tweets
 */


 router.get('/', function (req :Request, res :Response) {
    res.send('Birds home page')
  })


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Add New Tweet
 * @return  Response
 */


router.post('/tweet', function (req :Request, res :Response) {
  res.send('Birds home page')
})


/**
 * @author  zeel-codder
 * @param 
 * req : Request
 * res : Response
 * @use Function Remove  Tweet by id
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
 * @use Function Update  Tweet by id
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
 * @use Function Use to get tweet by name
 * @return  Response
 */


 router.get('/:name', function (req :Request, res :Response) {
    res.send('Birds home page')
 })
  
  
 export default router;



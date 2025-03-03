
import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';





const Auth=async (req:Request, res: Response,next:Function)=>{

    try{

        
        const tokenString:string=req.headers["authorization"] || "";
        const token:string=tokenString?.split(" ")[1];

        

        // console.log(req.headers)

        let user=await jwt.verify(token, process.env.JWT_SECRET||"");
        user=user as object;

      
        req.user_id=user._id;
        req.user_name=user.name;

      

     

        //console.log(req.user_name+" "+req.user_id)


        next();
        
    
    }catch(e){
       // console.log(e)
        res.sendStatus(404);
    }
}


export {Auth};
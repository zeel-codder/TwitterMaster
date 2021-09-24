
import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';




const Auth=async (req:Request, res: Response,next:Function)=>{

    try{

        
        const tokenString:string=req.headers["authorization"] || "";
        const token:string=tokenString?.split(" ")[1];

        const user=await jwt.verify(token, process.env.Secrete||"");

        console.log(user)

        next();
        
    
    }catch{
        res.sendStatus(404);
    }
}


export {Auth};
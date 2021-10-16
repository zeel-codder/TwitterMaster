
import { Response, Request } from 'express';
import { ErrorLoader,ResultLoader } from "../Response";
import { UserModel } from '../../database/Schema';
import {GetUser} from './CRUD';



const UserFollow = async (req: Request, res: Response) => {

    try {
        const Name:string=req.body.name;
        const MyName:string=req.user_name as unknown as string;

        console.log(Name,MyName);

        const Mydata = await UserModel.findOne({name:MyName});
        const data=await UserModel.findOne({name:Name});

        if(!Mydata || !data){
            return res.status(404).send(ErrorLoader("User not found", "nothing"));
        }


        if(! Mydata.follow.includes(Name)){

            Mydata.follow.push(Name);

            await Mydata.save();

        }

        if( ! data.followers.includes(MyName)){

            data.followers.push(MyName);
            await data.save();

        }

       
    


        res.status(200).send(ResultLoader("Done",null));
    } catch (e: any) {
        console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }
}


export {UserFollow};
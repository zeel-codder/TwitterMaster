import express, { Response, Request } from 'express';
import { TweetModel } from '../../database/Schema';
import { Tweet } from '../../interface/database/Schema';
import { ErrorLoader, ResultLoader } from "../Response";


const GetTweetsByIds = async (req: Request, res: Response) => {

    try {
        const Ids:string[]=req.body.ids;
        console.log(Ids)
        const List = await TweetModel.find({});
        // console.log(List);
        const filter = List.filter((data:any)=>
        {            
            // console.log("61698898ca3992f9d2420d4c","61698898ca3992f9d2420d4c"===JSON.stringify(data._id),JSON.stringify(data._id))
            return Ids.includes(data._id.toString())
        }
        
        );

        const TweetList = Array.from(filter).reverse();
        // console.log(TweetList)

        res.status(200).send(ResultLoader("All Tweet", TweetList));
    } catch (e: any) {
        console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }



}

export {GetTweetsByIds};
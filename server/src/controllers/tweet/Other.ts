import express, { Response, Request } from 'express';
import { TweetModel } from '../../database/Schema';
// import { Tweet } from '../../interface/database/Schema';
import { ErrorLoader, ResultLoader } from "../Response";


const GetTweetsByIds = async (req: Request, res: Response) => {

    try {
        const Ids:string[]=req.body.ids;
        //console.log(Ids)
        const List = await TweetModel.find({});
        // console.log(List);
        const filter = List.filter((data:any)=>
        {            
            return Ids.includes(data._id.toString())
        }
        
        );

        const TweetList = Array.from(filter).reverse();
        // console.log(TweetList)

        res.status(200).send(ResultLoader("All Tweet", TweetList));
    } catch (e: any) {
       // console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }
}





const GetTweetsOfUser = async (req: Request, res: Response) => {

    try {
        const name:string=req.params.name;
        const number:number=+req.params.length;
        
        const List = await TweetModel.find({Creator_Name:name}).limit(number).sort([['createdAt', -1]]);
        const TweetList=List;
        console.log(List.length)
        
        if(List.length<number){
            res.status(200).send(ResultLoader("All Tweet", {List:TweetList,isEnd:true}));
        }

        res.status(200).send(ResultLoader("All Tweet", {List:TweetList,isEnd:false}));
    } catch (e: any) {
        //console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }
}



const AddComment =async (req: Request, res: Response) => {

    try {
        const {_id,title}=req.body;
        //console.log(Ids)
        const Tweet = await TweetModel.findOne({ _id });

        if(!Tweet.comments){
            Tweet.comments=[]
        }

        Tweet.comments.push({title,Creator_Name:req.user_name})

        const TweetData=await Tweet.save();
      

        res.status(200).send(ResultLoader("All Tweet", TweetData._doc));
    } catch (e: any) {
       // console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }

}

const RemoveComment =async (req: Request, res: Response) => {

    try {
        const {_id,comment_id}=req.body;
        // console.log(comment_id)
        const Tweet = await TweetModel.findOne({ _id });

        if(!Tweet.comments){
            Tweet.comments=[]
        }
    

        // console.log(Tweet.comments,Tweet.comments.findIndex((data:any)=>
        
        // {
        //     // console.log(data._id.toString()===comment_id,data._id.toString())
        //     return data._id.toString()===comment_id
        // }))

        const index:number=Tweet.comments.findIndex((data:any)=>data._id.toString()===comment_id);

        if(index===-1){
            return res.status(404).send(ErrorLoader("Some Error", "null"));
        }

        Tweet.comments.splice(index,1);

        const TweetData=await Tweet.save();
      

        res.status(200).send(ResultLoader("Tweet", TweetData._doc));
    } catch (e: any) {
       // console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }

}


export {GetTweetsByIds,GetTweetsOfUser,AddComment,RemoveComment};
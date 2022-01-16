import express, { Response, Request } from 'express';
import { GroupModel, TweetModel } from '../../database/Schema';
// import { Tweet } from '../../interface/database/Schema';
import { ErrorLoader, ResultLoader,CropData } from "../Helper";
import { GetNewTweetList } from './Helper';


const GetTweetsByIds = async (req: Request, res: Response) => {

    try {
        const name:string=req.body.name;
        const number: number =+req.body.number;

        const group=await GroupModel.findOne({title:name});

        if(! group){

            return  res.status(404).send(ErrorLoader("Group not found","null"));

        }

        const Ids:any[]=group.tweets;

    
        const List = await TweetModel.find({}).sort([['createdAt', -1]]);
        // console.log(List);
        const filter = List.filter((data:any)=>
        {            
            return Ids.includes(data._id.toString())
        }
        );

        let TweetList = CropData(filter,number);

        TweetList = GetNewTweetList(TweetList,req.user_id);

        if (filter.length < number) {
            return res.status(200).send(ResultLoader("All Tweet", { List: TweetList, isEnd: true }));
        }

        console.log(TweetList)

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


        let TweetList=CropData(List,number);
        
        TweetList = GetNewTweetList(TweetList,req.user_id);
    
        
        if(List.length<number){
            return res.status(200).send(ResultLoader("All Tweet", {List:TweetList,isEnd:true}));
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
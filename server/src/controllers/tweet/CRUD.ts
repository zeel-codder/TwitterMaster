import express,{ Response, Request } from 'express';
import { TweetModel } from '../../database/Schema';
import { Tweet } from '../../interface/database/Schema';
import { ErrorLoader, ResultLoader } from "../Response";




const GetTweets = async (req: Request, res: Response) => {

    try {
        const List = await TweetModel.find({});
        const TweetList= Array.from(List).reverse();
        // console.log(TweetList)

        res.status(200).send(ResultLoader("All Tweet", TweetList));
    } catch (e: any) {
        // console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }



}



const GetTweet = async (req: Request, res: Response) => {

    try {

        const { _id } = req.params;
        // console.log(name);

        const Tweet = await TweetModel.findOne({ _id });

        if (Tweet === null) {
            return res.status(404).send(ErrorLoader("Tweet Not Found", "Not Found"))
        }

        res.status(200).send(ResultLoader("Tweet", Tweet));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("Tweet not found", e.message));

    }



}


const AddTweet = async (req: Request, res: Response,next:Function) => {

    try {

       

        console.log(req.file)

        let fileName:string=req.file?.filename as string;

        let newTweet: Tweet = req.body;

        if (!newTweet) {
            return res.status(500).send(ErrorLoader("Invalid Input", "Input"))
        }

        console.log(fileName);


        newTweet = {
            image: '',
            like: [],
            retweet: [],
            explore: [],
            ...newTweet,
        }

        if(fileName){
            if(req.file?.mimetype=='image/png'){
                newTweet.image =fileName;
            }else{
                newTweet.video =fileName;
            }
        }



        const newDoc = new TweetModel(newTweet);

        const Tweet = await newDoc.save();


        res.status(200).send(ResultLoader("Tweet Added", Tweet));
    } catch (e: any) {

        res.status(404).send(ErrorLoader(e.message, "Error"));

    }

}



const DeleteTweet = async (req: Request, res: Response) => {

    try {
        let { _id } = req.body;
        const TweetDelete = await TweetModel.deleteOne({ _id });
        res.status(200).send(ResultLoader("Tweets Deleted", TweetDelete));

    } catch (e: any) {

        res.status(404).send(ErrorLoader("TweetList not found", e.message));

    }
}



const UpdateTweet = async (req: Request, res: Response) => {

    try {
        let { before, after } = req.body;

        const { _id, user_id, type } = before;

        const newTweet: Tweet = after;

        let Tweet = await TweetModel.findOne({ _id });

        switch (type) {

            case "like":
                Tweet.like.push(user_id);
                await Tweet.save();
            break;
            case "retweet":
                Tweet.retweet.push(user_id);
                await Tweet.save();
            break;
            case "remove like":
                Tweet.like.pull(user_id);
                await Tweet.save();
            break;
            case "any":
                await TweetModel.findOneAndUpdate({ _id }, newTweet);
                Tweet=await TweetModel.findOne({_id});   
            break;
            default:
                return res.status(500).send(ErrorLoader("Invalid Input","Input"))


        }

        if(Tweet==null){
            res.status(404).send(ErrorLoader("Tweet Not Found",Tweet));
        }

        res.status(200).send(ResultLoader("Tweets Updated", Tweet));

    } catch (e: any) {

        res.status(404).send(ErrorLoader("TweetList not found", e.message));

    }
}




export { GetTweets, AddTweet, DeleteTweet, UpdateTweet, GetTweet };



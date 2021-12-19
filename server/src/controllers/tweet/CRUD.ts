import express, { Response, Request } from 'express';
import { TweetModel } from '../../database/Schema';
import { Tweet } from '../../interface/database/Schema';
import { CropData, ErrorLoader, ResultLoader } from "../Helper";
import { GetGroupList } from '../group/CRUD';
import fs, { PathLike } from 'fs';
import { GetNewTweet, GetNewTweetList, GetTweetData } from './Helper';
import { cloudinary } from '../Media';





const GetTweets = async (req: Request, res: Response) => {

    try {
        const name = req.user_id;

        const number: number = +req.params.length;
        const List = await TweetModel.find({}).sort([['createdAt', -1]]).limit(number);



        let TweetList = CropData(List, number);

        TweetList = GetNewTweetList(TweetList, name);

        console.log(number,TweetList.length,List.length);
        
        if (List.length < number) {
            return res.status(200).send(ResultLoader("All Tweet", { List: TweetList, isEnd: true }));
        }

        res.status(200).send(ResultLoader("All Tweet", { List: TweetList, isEnd: false }));
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

        res.status(200).send(ResultLoader("Tweet", GetTweetData(Tweet, req.user_id)));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("Tweet not found", e.message));

    }



}


const AddTweet = async (req: Request, res: Response, next: Function) => {

    try {

        let Tweet: any = req.body;


        if (!Tweet) {
            return res.status(500).send(ErrorLoader("Invalid Input", "Input"))
        }



        const newTweet: any = {
            description: Tweet.description,
            groups: Tweet.groups,        
            url: Tweet.url,
        }

        newTweet.Creator_ID = req.user_id;
        newTweet.Creator_Name = req.user_name;


        if (Tweet.media) {
            if (Tweet.isImage) {
                newTweet.image = Tweet.media;
            }
            else {
                newTweet.video = Tweet.media;
            }
        }



        const newDoc = new TweetModel(newTweet);

        let newTweetData=await newDoc.save();


        res.status(200).send(ResultLoader("Tweet Added", null));



        let { groups } = newTweet;



        const listGroup = groups?.split("|");

        const GroupList: any[] = await GetGroupList();

        // console.log(GroupList,listGroup);



        GroupList.forEach(async (data) => {
            if (listGroup?.includes(data.title)) {
                // console.log("add")
                data.tweets.push(newTweetData._id);
                await data.save();
            }
        });
        console.log(listGroup)


    } catch (e: any) {

        console.log(e)

        res.status(404).send(ErrorLoader(e.message, "Error"));

    }

}



const DeleteTweet = async (req: Request, res: Response) => {

    try {
        let { _id } = req.body;
        const TweetDelete = await TweetModel.findOne({ _id });
        const TweetDeleteData = await TweetModel.deleteOne({ _id });

        res.status(200).send(ResultLoader("Tweets Deleted", TweetDeleteData));

        const listGroup: string[] = TweetDelete.groups?.split("|") as string[];

        // console.log(groupList);

        const GroupList: any[] = await GetGroupList();


        GroupList?.forEach(async (data) => {

            if (data === '') return;

            if (listGroup?.includes(data.title)) {

                data.tweets.splice(data.tweets.indexOf(TweetDelete._id), 1);
                await data.save();
            }
        });



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

        if (Tweet == null) {
            res.status(404).send(ErrorLoader("Tweet Not Found", Tweet));
        }

        switch (type) {

            case "like":
                Tweet.like.push(user_id);
                await Tweet.save();
                break;
            case "retweet":
                Tweet.retweet++;
                await Tweet.save();
                break;
            case "remove like":
                Tweet.like.pull(user_id);
                await Tweet.save();
                break;
            case "any":
                await TweetModel.findOneAndUpdate({ _id }, newTweet);
                Tweet = await TweetModel.findOne({ _id });
                break;
            default:
                return res.status(500).send(ErrorLoader("Invalid Input", "Input"))


        }


        console.log(Tweet)





        res.status(200).send(ResultLoader("Tweets Updated", GetNewTweet(Tweet, req.user_id)));

    } catch (e: any) {

        //console.log(e);

        res.status(404).send(ErrorLoader("TweetList not found", e.message));

    }
}




export { GetTweets, AddTweet, DeleteTweet, UpdateTweet, GetTweet };



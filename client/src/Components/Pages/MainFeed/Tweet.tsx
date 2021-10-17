import React, { useState, useEffect } from "react";

import { Tweet } from '../List/Tweets';
import {
    useParams
} from "react-router-dom";
import { GetTweetId,AddCommentApi,RemoveCommentApi } from "../../../Actions/Api";
import Loader from '../../Loaders/Loading';
import { Avatar, Button, TextareaAutosize } from "@material-ui/core";
import { useAppSelector } from "../../../store";
import CancelIcon from '@mui/icons-material/Cancel';




const TweetPage: React.FC<{}> = () => {

    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [TweetData, setTweetData] = useState<any>(null);
    const [text, setText] = useState<string>("");



    useEffect(() => {

        GetTweetId(id)
            .then((res) => {
                console.log(res.data.data);
                setTweetData(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }, [])


    function AddComment(){

        if(!text) return;

        setIsLoading(true);

        AddCommentApi(TweetData._id,text)
        .then((res)=>{

            setTweetData(res.data.data);
            setText("");

        }).catch((e)=>console.log(e))
        .finally(()=>{
            setIsLoading(false);
        })


    }

    function RemoveComment(_id:string){

        setIsLoading(true);

        RemoveCommentApi(TweetData._id,_id)
        .then((res)=>{
            setTweetData(res.data.data);
        }).catch((e)=>console.log(e))
        .finally(()=>{
            setIsLoading(false);
        })

    }

    return (
        <div>
            {isLoading && <Loader></Loader>}


            {
                TweetData
                &&

                <Tweet {...TweetData} ></Tweet>

            }



            <div>
                <h4 className="a">Comments</h4>
            </div>

            {
                TweetData
                &&
                TweetData.comments.map((data: any) => {
                    return <Comment {...data} removeComment={RemoveComment} key={data._id}></Comment>
                })
            }

            <TextareaAutosize className="newtweet_text newcommant"

                placeholder="Enter Comment(350 char At most) ...."

                maxRows="10"

                value={text}

                maxLength={500}



                onChange={(node) => {


                    setText(node.target.value);

                }}



                required></TextareaAutosize>
            <div className="flex full">

                <Button variant="contained" color="primary"

                    onClick={AddComment}


                > Add Comment

                </Button>
            </div>





        </div>

    )
}


const Comment: React.FC<{ Creator_Name: string, title: string, removeComment:Function,_id?:string,isPick?:boolean }> = ({ title, Creator_Name,removeComment,_id,isPick=false }) => {

    const User:any=useAppSelector((state)=>state.UserReducer);


    return (
        <div className="comment">
            <div className="flex full space">

            <div className="creator-section flex">
                <Avatar alt="Remy Sharp" src="https://zeelcodder.tech/images/home/zeel.jpeg" />
                <a href={"/user/" + Creator_Name} className="a">
                    {Creator_Name}
                </a>
            </div>
            
                {
                
                    User.name===Creator_Name && !isPick
                    &&
                    <CancelIcon className="a"  onClick={()=>removeComment(_id)}> </CancelIcon>
                }
            
            </div>
            <div>
                <div className="text">
                    {
                        title

                    }
                </div>
            </div>

        </div>


    )

}


export {Comment};

export default TweetPage;
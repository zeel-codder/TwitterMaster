import React from "react";

import { TweetSchema } from "../DataType/Feed";
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import { Avatar, BottomNavigationAction, Button } from "@material-ui/core";
// import { Share } from "@material-ui/icons";
import Search from '../Same/Search';
import NewTweet from './helper/tweet';
import { useRef,useState,useEffect } from "react";
import {HomeSchema} from '../DataType/pages';
import { GetUserTweetList } from "../Actions/Api";



const  Home :React.FC<HomeSchema> =({type}) =>{

    const newTweet=useRef<HTMLDivElement>(null);




    const [List,setList] = useState([]);

    useEffect(()=>{
        GetUserTweetList().then(res=>{
            // console.log(res.data)
            setList(res.data.data);
        }).catch((e)=>{
            console.log(e);

        })
    },[])



    return (
        <div>
            <h1> { type || 'Home' }</h1>

            <div className="newTweetBox" ref={newTweet}>
            <Button  className="cross" variant="contained" color="primary" 
             onClick={()=>{

                // console.log('click')
                newTweet.current?.classList.toggle("shownewTweetBox");
            }}
            >
                x
            </Button>

            <div className="h"></div>

            <NewTweet  />

            </div>
            <Search placeName="Tweet " />

            <Button className="tweet" variant="contained" color="primary"

            onClick={()=>{

                // console.log('click')
                newTweet.current?.classList.toggle("shownewTweetBox");
            }}
            
            
            > <h1># Tweet</h1>
            
            </Button>
            {
                List.map((data)=>{

                    return <Tweet {...data}></Tweet>

                })
            }
        </div>
    )
}


// interface TweetSchema{
//     creator:undefined|string;
//     img?:undefined|Url;
//     video?:undefined|Url;
//     message:undefined|string;
//     link:undefined|number;
//     retweet:undefined|number;
// }

const Tweet: React.FC<TweetSchema>=({image,video,creator,description,like,retweet})=>{

    return (

        <div className="tweet-container pad">
            

            <div className="creator-section flex">
            <Avatar alt="Remy Sharp" src="https://zeelcodder.tech/images/home/zeel.jpeg" />
                <a href="/" className="a">
                {creator}
                </a>
            </div>

            <div className="text">
                {description}
            </div>

            <div className="media">

                {
                    image ? <img src={`http://localhost:3001/files/${image}`} alt={image} /> :''
                }
                {
                    video ? <video src={`http://localhost:3001/files/${video}`}  controls></video> :''
                }
            </div>

            <div className="Socials flex blue">

                <div className="like flex">

                <BottomNavigationAction  icon={<FavoriteBorderRoundedIcon  />} />
                <div className="flex">

                    {like?.length}
                </div>
                </div>

                <div className="retweet flex">
                <BottomNavigationAction  icon={<ExitToAppRoundedIcon  />} />
                <div>

                    {retweet?.length}
                </div>
                </div>

                <div className="share flex">

                <BottomNavigationAction  icon={<ShareRoundedIcon />} />


                </div>






            </div>



        </div>
    )

}

export default Home;
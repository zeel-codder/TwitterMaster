import React from "react";

import { TweetSchema } from "../DataType/Feed";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import { Avatar, BottomNavigationAction, Button } from "@material-ui/core";
import { Share } from "@material-ui/icons";
import Search from '../Same/Search';
import NewTweet from './helper/tweet';
import { useRef,useEffect } from "react";



export default function Home() {

    const newTweet=useRef<HTMLDivElement>(null);




    const tem:TweetSchema[] =[

        {
                creator:'demo',
    img:'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=828&q=80',
    
    message:"My name is Zeel Sureshbhai Prajapati.I am living in kalol, Gujarat. Presently, I am pursuing Computer Science at Nirma University. I love to code. I am doing competitive programming and using java for competitive programming",
    like:1,
    retweet:12,


        },
        {
                creator:'demo2',
    img:'https://images.unsplash.com/photo-1630510589619-a6e1f502274e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    
    message:"An array is a special type of data type which can store multiple values of different data types sequentially using a special syntax.",
    like:1,
    retweet:122,


        },
        {
                creator:'demo3',
    video:'https://www.w3schools.com/html/mov_bbb.mp4',
    
    message:"My name is Zeel Sureshbhai Prajapati.I am living in kalol, Gujarat. Presently, I am pursuing Computer Science at Nirma University. I love to code. I am doing competitive programming and using java for competitive programming",
    like:1,
    retweet:12,


        },
        {
                creator:'demo',
    img:'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=828&q=80',
    
    message:"My name is Zeel Sureshbhai Prajapati.I am living in kalol, Gujarat. Presently, I am pursuing Computer Science at Nirma University. I love to code. I am doing competitive programming and using java for competitive programming",
    like:1,
    retweet:12,


        }

    ]

 



    return (
        <div>
            <h1>Home</h1>

            <div className="newTweetBox" ref={newTweet}>
            <Button  className="cross" variant="contained" color="primary" 
             onClick={()=>{

                // console.log('click')
                newTweet.current?.classList.toggle("shownewTweetBox");
            }}
            >
                x
            </Button>

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
                tem.map((data)=>{

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

const Tweet: React.FC<TweetSchema>=({img,video,creator,message,like,retweet})=>{

    return (

        <div className="tweet-container pad">
            

            <div className="creator-section flex">
            <Avatar alt="Remy Sharp" src="https://zeelcodder.tech/images/home/zeel.jpeg" />
                <a href="/" className="a">
                {creator}
                </a>
            </div>

            <div className="text">
                {message}
            </div>

            <div className="media">

                {
                    img ? <img src={img} alt={img} /> :''
                }
                {
                    video ? <video src={video}  controls></video> :''
                }
            </div>

            <div className="Socials flex blue">

                <div className="like flex">

                <BottomNavigationAction  icon={<FavoriteBorderRoundedIcon  />} />
                <div className="flex">

                    {like}
                </div>
                </div>

                <div className="retweet flex">
                <BottomNavigationAction  icon={<ExitToAppRoundedIcon  />} />
                <div>

                    {retweet}
                </div>
                </div>

                <div className="share flex">

                <BottomNavigationAction  icon={<ShareRoundedIcon />} />


                </div>






            </div>



        </div>
    )

}
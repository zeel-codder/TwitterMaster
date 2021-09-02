import React from "react";

import { TweetSchema } from "../DataType/Feed";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import { BottomNavigationAction } from "@material-ui/core";
import { Share } from "@material-ui/icons";

export default function Home() {


    const tem:TweetSchema[] =[

        {
                creator:'demo',
    img:'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=828&q=80',
    
    message:"Hindi (Devanagari: हिन्दी, ISO: Hindī), or more precisely Modern Standard Hindi (Devanagari: मानक हिन्दी, ISO: Mānak Hindī),[8] is an Indo-Aryan language spoken chiefly in North India. Hindi has been described as a ",
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
    
    message:"Hindi (Devanagari: हिन्दी, ISO: Hindī), or more precisely Modern Standard Hindi (Devanagari: मानक हिन्दी, ISO: Mānak Hindī),[8] is an Indo-Aryan language spoken chiefly in North India. Hindi has been described as a ",
    like:1,
    retweet:12,


        },
        {
                creator:'demo',
    img:'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=828&q=80',
    
    message:"Hindi (Devanagari: हिन्दी, ISO: Hindī), or more precisely Modern Standard Hindi (Devanagari: मानक हिन्दी, ISO: Mānak Hindī),[8] is an Indo-Aryan language spoken chiefly in North India. Hindi has been described as a ",
    like:1,
    retweet:12,


        }

    ]




    return (
        <div>
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

        <div className="tweet-container">

            <div className="creator-section flex">
                <AccountCircleRoundedIcon />
                <a href="#" className="a">
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
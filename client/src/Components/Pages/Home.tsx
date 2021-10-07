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
import { GetUserTweetList, UpdateTweet } from "../Actions/Api";
import { useAppSelector } from "../../store";





const  Home :React.FC<HomeSchema> =({type}) =>{
    console.log('Home')

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

            <NewTweet close={newTweet}  />

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

const Tweet: React.FC<TweetSchema>=({_id,image,video,creator,description,like,retweet,Creator_ID,Creator_Name})=>{
 
    const User=useAppSelector((state)=>state.UserReducer);

    const type={_id,user_id:User._id,type:""};
    const [TweetData,setTweetData]=useState({_id,image,video,creator,description,like,retweet,Creator_ID,Creator_Name});
    const [isLike,setIsLike]=useState(like?.includes(User._id as string));
    const [Like,setLike]=useState(like?.length);
    const [Retweet,setReteet]=useState(retweet);





    const handleLike=()=>{

        if(isLike){
            type.type="remove like";
        }else{
            type.type="like"
        }
        UpdateTweet(type,TweetData)
        .then((res)=>{
            setIsLike(!isLike);
            const newTweet=res.data.data;
            setTweetData(newTweet);
            setLike(newTweet.like.length);
            setReteet(newTweet.retweet);
        }).catch((e)=>{
            console.log(e);
        })

    }

    const handleShare=()=>{

    
        type.type="retweet";
       
        UpdateTweet(type,TweetData)
        .then((res)=>{
            setIsLike(!isLike);
            const newTweet=res.data.data;
            setTweetData(newTweet);
            setLike(newTweet.like.length);
            setReteet(newTweet.retweet);
        }).catch((e)=>{
            console.log(e);
        })

    }


    return (

        <div className="tweet-container pad">
            

            <div className="creator-section flex">
            <Avatar alt="Remy Sharp" src="https://zeelcodder.tech/images/home/zeel.jpeg" />
                <a href={"/user/"+TweetData.Creator_Name} className="a">
                {TweetData.Creator_Name}
                </a>
               

            </div>

            <div className="text">
                {TweetData.description}
            </div>

            <div className="media">

                {
                    TweetData.image ? <img src={`http://localhost:3001/files/${TweetData.image}`} alt={TweetData.image} /> :''
                }
                {
                    TweetData.video ? <video src={`http://localhost:3001/files/${TweetData.video}`}  controls></video> :''
                }
            </div>

            <div className="Socials flex blue">

                <div className="like flex" onClick={handleLike}>

                <FavoriteBorderRoundedIcon  />
                <div className="flex">

                    {Like}
                </div>
                </div>

                <div className="retweet flex" onClick={handleShare}>
                <ShareRoundedIcon />
                <div>

                    {Retweet}
                </div>
                </div>

                {/* <div className="share flex">

                <ExitToAppRoundedIcon  />


                </div> */}
            </div>



        </div>
    )

}

export default Home;
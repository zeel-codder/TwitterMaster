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
import { GetUserTweetList, UpdateTweet } from "../../Actions/Api";
import { useAppSelector, useAppDispatch } from '../../store';
import Loader from '../Loaders/Loading';





const  Home :React.FC<HomeSchema> =({type,isMe}) =>{
    // console.log('Home')

    const newTweet=useRef<HTMLDivElement>(null);

    const List:any=useAppSelector((state)=>state.DataReducer);
    const User=useAppSelector((state)=>state.UserReducer);
    const dispatch=useAppDispatch();
    const [IsLoading,setLoading]=useState(true);

    const [DataList,setDataList]=useState([]);

    // console.log(List);


    useEffect(()=>{
        GetUserTweetList().then(res=>{
            setDataList(res.data.data);
            dispatch({type:"AddTweets",data:res.data.data})
            setLoading(false); 
        }).catch((e)=>{
            console.log(e);
        })
    },[])

    function handleSearch(data:any[]){
        if(data==null){
            return setDataList(List.Tweets);
        }
        const newData:any[]=data;
        setDataList(newData as any);
        // console.log(data);
    }
    
    
    
    return (
        <div>
            <h1> { type || 'Home' }</h1>

            <Search placeName="Tweet"  cb={handleSearch} data={DataList} />
            {
            IsLoading 
            ?
            <Loader></Loader>
            :
            <>
            
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

            <Button className="tweet" variant="contained" color="primary"

            onClick={()=>{
                
                // console.log('click')
                newTweet.current?.classList.toggle("shownewTweetBox");
            }}
            
            
            > <h1># Tweet</h1>
            
            </Button>
            {
                DataList.map((data:TweetSchema)=>{
                    const {Creator_ID}=data;
                    if(isMe){
                        if(Creator_ID===User._id){
                            return <Tweet {...data}></Tweet>
                        }else{
                            
                            return <></>
                        }
                    }else{
                        return <Tweet {...data}></Tweet>
                    }
                })
            }
            </>

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
    const Link=process.env.REACT_APP_WebSite;

    const type={_id,user_id:User._id,type:""};
    const [TweetData,setTweetData]=useState({_id,image,video,creator,description,like,retweet,Creator_ID,Creator_Name});
    const [isLike,setIsLike]=useState(like?.includes(User._id as string));
    const [Like,setLike]=useState(like?.length);
    const [Retweet,setReteet]=useState(retweet);
    const [IsLoading,setLoading]=useState(false);





    const handleLike=()=>{

        if(isLike){
            type.type="remove like";
        }else{
            type.type="like"
        }
        setLoading(true);
        UpdateTweet(type,TweetData)
        .then((res)=>{
            
            setIsLike(!isLike);
            const newTweet=res.data.data;
            setTweetData(newTweet);
            setLike(newTweet.like.length);
            setReteet(newTweet.retweet);
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        })

    }

    const handleShare=()=>{

    
        type.type="retweet";
        setLoading(true);
       
        UpdateTweet(type,TweetData)
        .then((res)=>{
            setIsLike(!isLike);
            const newTweet=res.data.data;
            setTweetData(newTweet);
            setLike(newTweet.like.length);
            setReteet(newTweet.retweet);
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        })

    }


    return (

        <div className="tweet-container pad">
            

            <div className="creator-section flex">
            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
                <a href={"/user/"+TweetData.Creator_Name} className="a">
                {TweetData.Creator_Name}
                </a>
               

            </div>

            <div className="text">
                {TweetData.description}
            </div>

            <div className="media">

                {
                    TweetData.image ? <img src={`${Link}/files/${TweetData.image}`} alt={TweetData.image} /> :''
                }
                {
                    TweetData.video ? <video src={`${Link}/files/${TweetData.video}`}  controls></video> :''
                }
            </div>

            <div className="Socials flex blue">

                <div className="like flex" onClick={handleLike}>

                    {IsLoading && <Loader></Loader>}

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
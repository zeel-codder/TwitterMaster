import React,{useState} from "react";
import { TweetSchema } from "../../../DataType/Feed";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import { Avatar} from "@material-ui/core";
// import { Share } from "@material-ui/icons";
import {  DeleteTweet, UpdateTweet } from "../../../Actions/Api";
import { useAppSelector } from '../../../store';
import Loader from '../../Loaders/Loading';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import CancelIcon from '@mui/icons-material/Cancel';


interface TweetsSchema{
    DataList:TweetSchema[];
}



const  Tweets :React.FC<TweetsSchema> =({DataList}) =>{
      
    return (
          <>
            {
                DataList.map((data:TweetSchema)=>{
                 
                        return <Tweet {...data} key={data._id}></Tweet>
                    }
            )
            }
            </>

    )
}

const Tweet: React.FC<TweetSchema>=(prpos:TweetSchema)=>{

    const {_id,image,video,creator,description,like,retweet,Creator_ID,Creator_Name,groups}=prpos;
 
    const User=useAppSelector((state)=>state.UserReducer);
    const type={_id,user_id:User._id,type:""};
    const [TweetData,setTweetData]=useState({_id,image,video,creator,description,like,retweet,Creator_ID,Creator_Name});
    const [isLike,setIsLike]=useState(like?.includes(User._id as string));
    const [Like,setLike]=useState(like?.length);
    const [Retweet,setReteet]=useState(retweet);
    const [IsLoading,setLoading]=useState(false);
    const groupList:string[]=groups?.split("|") as string[];




    function handleDelete(){

        setLoading(true);

        DeleteTweet(_id as string)
        .then((res)=>{

            window.location.reload();

        }).catch((e)=>console.log(e))
        .finally(()=>setLoading(false))
        


    }

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

    const handleShare=(Wh:boolean)=>{

        type.type="retweet";
        setLoading(true);

        if(!Wh){
            window.open('https://twitter.com/intent/tweet?text=Link:'+window.location.href, '_blank')?.focus();
        }else{
            window.open('whatsapp://send?text=See This Link:'+window.location.href, '_blank')?.focus();

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
        }).finally(()=>{
            setLoading(false);
        })

    }


    return (

        <div className="tweet-container pad">

            <div className="flex full space">

            

            <div className="creator-section flex">
                <Avatar alt="Remy Sharp" src="https://zeelcodder.tech/images/home/zeel.jpeg" />
                <a href={"/user/"+TweetData.Creator_Name} className="a">
                {TweetData.Creator_Name}
                </a> 
            </div>

            {

                User._id===Creator_ID
                &&
                <CancelIcon className="a"  onClick={handleDelete}> </CancelIcon>
            }
            </div>

            <div className="text">
                {
                    TweetData.description

                }

            </div> 
            <div className="groups">

                {

                    groupList?.map((data,index)=>{

                        return  (

                                data===""
                                ?
                                <></>
                                :
                                <a className="a"  key={index} href={"/group/"+data}>
                                #{data} 
                                </a>
                            
                        )


                    }
                    )
                }
            </div>

            <div className="media">

                {
                    TweetData.image ? <img src={TweetData.image} alt={TweetData.image} /> :''
                }
                {
                    TweetData.video ? <video src={TweetData.video}  controls></video> :''
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

                <div className="retweet flex">
                <ShareRoundedIcon />
                <div>
                    {Retweet}
                </div>
                    <WhatsAppIcon onClick={()=>handleShare(true)}></WhatsAppIcon>
                    <TwitterIcon  onClick={()=>handleShare(false)}></TwitterIcon>
                </div>

                {/* <div className="share flex">

                <ExitToAppRoundedIcon  />


                </div> */}
            </div>



        </div>
    )

}

export default Tweets;
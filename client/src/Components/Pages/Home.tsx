import React from "react";
import { TweetSchema } from "../../DataType/Feed";
import {  Button } from "@material-ui/core";
import Search from './Same/Search';
import NewTweet from './helper/tweet';
import { useRef,useState,useEffect } from "react";
import {HomeSchema} from '../../DataType/pages';
import { GetAllGroups, GetUserTweetList } from "../../Actions/Api";
import { useAppSelector, useAppDispatch } from '../../store';
import Loader from '../Loaders/Loading';
import Tweets from './List//Tweets';





const  Home :React.FC<HomeSchema> =({type,isMe}) =>{
    // console.log('Home')

    const newTweet=useRef<HTMLDivElement>(null);
    const List:any=useAppSelector((state)=>state.DataReducer);
    const User=useAppSelector((state)=>state.UserReducer);
    const dispatch=useAppDispatch();
    const [IsLoading,setLoading]=useState(true);
    const [DataList,setDataList]=useState<TweetSchema[]>([]);

 
    useEffect(()=>{
        // if(List.Tweets.length===0){
        GetUserTweetList().then(res=>{
            if(isMe){
                const newData:TweetSchema[]=res.data.data.filter((data:TweetSchema)=>data.Creator_ID===User._id);
                setDataList(newData);
            }else{
                setDataList(res.data.data);
            }
            dispatch({type:"AddTweets",data:res.data.data})
            setLoading(false); 
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
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
            <Tweets DataList={DataList}></Tweets>
            </>

}
</div>
        )
        }

        

export default Home;
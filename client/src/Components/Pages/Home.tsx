import React from "react";
import { TweetSchema } from "../../DataType/Feed";
import {  Button } from "@material-ui/core";
import Search from './Same/Search';
import NewTweet from './helper/tweet';
import { useRef,useState,useEffect,useLayoutEffect } from "react";
import {HomeSchema} from '../../DataType/pages';
import {  GetUserTweetList } from "../../Actions/Api";
import { useAppSelector, useAppDispatch } from '../../store';
import Loader from '../Loaders/Loading';
import Tweets from './List/Tweets';





const  Home :React.FC<HomeSchema> =({type,isMe}) =>{
    // console.log('Home')

    const newTweet=useRef<HTMLDivElement>(null);
    const List:any=useAppSelector((state)=>state.DataReducer);
    const User=useAppSelector((state)=>state.UserReducer);
    const Length:any=useAppSelector((state)=>state.LengthReducer);
    const dispatch=useAppDispatch();
    const [IsLoading,setLoading]=useState(true);
    const [DataList,setDataList]=useState<TweetSchema[]>([]);
    const [isEnd,setIsEnd]=useState(false);


    function GetDataList(){
        console.log('call data');
        GetUserTweetList(Length.TweetLength)
        .then(res=>{
            if(isMe){
                const newData:TweetSchema[]=res.data.data.List.filter((data:TweetSchema)=>data.Creator_ID===User._id);
            setDataList(newData);
        }else{
            setDataList(res.data.data.List);
            if(res.data.data.isEnd){
                setIsEnd(true);
            }
        }
        dispatch({type:"AddTweets",data:res.data.data.List})
    }).catch((e)=>{
        console.log(e);
    }).finally(()=>{
        setLoading(false);
    })

    }


    useEffect(()=>{

        dispatch({type:"Length_ChangeTweetLength",data:10});
        GetDataList()
        setIsEnd(false);
        

    },[])

  

 
    useEffect(()=>{

        if(!isEnd){
            GetDataList()
        }
        // return ()=>{
        //     window.removeEventListener('scroll',handleScroll);
        // }
    },[Length])

 

    function handleSearch(data:any[]){
        if(data==null){
            return setDataList(List.Tweets);
        }
        const newData:any[]=data;
        setDataList(newData as any);
        // console.log(data);
    }



      
     
    
    
    
    return (
        <div >
            <h1> { type || 'Home' }</h1>

            <Search placeName="Tweet"  cb={handleSearch} data={DataList} />
            {
            IsLoading 
            &&
            <Loader></Loader>
            }
            <>
            
            <div className="newTweetBox" ref={newTweet}>
            <Button  className="cross" variant="contained" color="primary" 
             onClick={()=>{
                 
                 // console.logx('click')
                 newTweet.current?.classList.toggle("shownewTweetBox");
                }}
                >
                x
            </Button>

            <div className="h relative"></div>

            <NewTweet close={newTweet} load={setLoading}  />

            </div>

            <Button className="tweet" variant="contained" color="primary"

            onClick={()=>{
                
                // console.log('click')
                newTweet.current?.classList.toggle("shownewTweetBox");
            }}
            
            
            > <h1># <span className="none_m">Tweet</span></h1>
            
            </Button>
            <Tweets DataList={DataList} isEnd={isEnd}></Tweets>
            </>


</div>
        )
        }

        

export default Home;
import React ,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../store';
import { GroupSchema, TweetSchema } from '../../../DataType/Feed';
import { GetAllGroups, GetGroupsByIds } from '../../../Actions/Api';
import Loader from '../../Loaders/Loading';
import Tweets from '../List/Tweets';
import Search from '../Same/Search';
import Page404 from '../404';
import {
useParams
} from "react-router-dom";




const Group:React.FC<{}> =() =>{

    const {name} = useParams<{name:string}>();
    // console.log(name);
    const List:any=useAppSelector((state)=>state.DataReducer)
    const dispatch=useAppDispatch();
    const [IsLoading,setLoading]=useState<boolean>(true);
    const [DataList,setDataList]=useState<TweetSchema[]>([]);

    
    console.log(name);

    const SetList=(data:GroupSchema[])=>{

        const TweetList:string[]=data.find((data:GroupSchema)=>data.title===name)?.tweets!;
        console.log(TweetList);
     
        GetGroupsByIds(TweetList)
        .then((res)=>{
            console.log(res.data.data);
            setDataList(res.data.data);
        })
        .catch((e)=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        })

    }
    
    
    
    useEffect(()=>{
        if(List.Groups.length===0){
            GetAllGroups()
            .then((res)=>{
                console.log(res.data.data);
                dispatch({ type:"AddGroups",data:res.data.data});  
                SetList(res.data.data);
            })
            .catch((e)=>{
                console.log(e);
            }).finally(()=>{
                setLoading(false);
            })
        }else{
            SetList(List.Groups);
        }
        console.log('change')
        },[]);
    
        if(!name){
            return <Page404></Page404>
        }

    function handleSearch(data:TweetSchema[]){
        if(data==null){
            return setDataList(List.Groups);
        }
        const newData:any[]=data;
        setDataList(newData as any);
        // console.log(data);
    }




   

    return (
        <div className="pad">
        <h1 className="blue">
            
            {name}
            </h1>

        <Search placeName="Tweet"  data={DataList} cb={handleSearch}/>


        {
            IsLoading

            ?
            <Loader></Loader>
            :
        
        <> 

        {
            DataList.length===0
            ?
            <Page404></Page404>
            :            
            <Tweets DataList={DataList}></Tweets>
        }
            
</>
    }
        
               
      </div>  
    )
}




export default Group;
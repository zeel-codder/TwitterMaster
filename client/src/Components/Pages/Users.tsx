import React ,{useEffect,useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { GetUsers } from '../../Actions/Api';
import Loader from '../Loaders/Loading';
import UserList from './List/Users';




const Group:React.FC<{}> =() =>{
    

    const List:any=useAppSelector((state)=>state.DataReducer);
    const [IsLoading,setLoading]=useState(true);
    const [DataList,setDataList]=useState([]);


    const dispatch=useAppDispatch();

    useEffect(()=>{
        GetUsers()
        .then((res)=>{
           setDataList(res.data.data);
           dispatch({ type:"AddUsers",data:res.data.data});
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        })
    },[]);
    // console.log(List)


    function handleSearch(data:any[]){
        if(data==null){
            return setDataList(List.Users);
        }
        const newData:any[]=data;
        setDataList(newData as any);
        // console.log(data);
    }

   

    return (
        <div>
           
            {

            IsLoading 
            ?
            <Loader/>
            :

            <>
            <UserList List={DataList}></UserList>

            </>
            }
                
            
                   
          </div>
        )
}







export default Group;
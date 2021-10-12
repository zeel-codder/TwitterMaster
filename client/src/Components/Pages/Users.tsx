import React ,{useEffect,useState} from 'react';
import { Avatar, Button} from '@material-ui/core';
import Search from '../Same/Search';
import { UserData } from '../DataType/Feed';
import { useAppSelector, useAppDispatch } from '../../store';
import { GetUsers } from '../../Actions/Api';
import Loader from '../Loaders/Loading';




const Group:React.FC<{}> =() =>{
    

    const List:any=useAppSelector((state)=>state.DataReducer);
    const [IsLoading,setLoading]=useState(true);
    const [DataList,setDataList]=useState([]);


    const dispatch=useAppDispatch();

    useEffect(()=>{
        GetUsers()
        .then((res)=>{
           setDataList(res.data.data);
           console.log(res.data.data);
           dispatch({ type:"AddUsers",data:res.data.data});
           setLoading(false);
        });
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
        <div className="pad">
           
            <h1 className="blue">
                
               Users
                
            </h1>

            

            
            
            <Search placeName="Users" cb={handleSearch} data={DataList} />

            {

            IsLoading 
            ?
            <Loader/>
            :

            <>
            {
                DataList.map((data:UserData, index :number) => {
                    
                    
                    return <User {...data}></User>
                    
                })
            }

            </>
            }
                
            
                   
          </div>
        )
}


const User: React.FC<UserData>=({name}) => {

    return (

        <div className="tweet-container flex">

        <Avatar 
        alt="Remy Sharp" 
        src={"https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} 
        
        variant='square'
        />


        <div className="flex column start explore">
            <h3>

                
                <a href="/" className="a">
                    @{name}

                </a>
            </h3>
        </div>
        </div>


    )


}




export default Group;
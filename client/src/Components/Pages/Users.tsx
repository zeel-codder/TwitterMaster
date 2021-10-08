import React ,{useEffect,} from 'react';
import { Avatar, Button} from '@material-ui/core';
import Search from '../Same/Search';
import { UserData } from '../DataType/Feed';
import { useAppSelector, useAppDispatch } from '../../store';
import { GetUsers } from '../../Actions/Api';





const Group:React.FC<{}> =() =>{
    

    const List:any=useAppSelector((state)=>state.DataReducer);


    const dispatch=useAppDispatch();

    useEffect(()=>{
        GetUsers()
        .then((res)=>{
            console.log(res.data.data);
           dispatch({ type:"AddUsers",data:res.data.data});
        });
    },[]);
    console.log(List)

   

    return (
        <div className="pad">
           
            <h1 className="blue">
                
               Users
                
            </h1>

            
            
            <Search placeName="Group " />
            {
                List.Users.map((data:UserData, index :number) => {

        
                        return <User {...data}></User>
                    
                })
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
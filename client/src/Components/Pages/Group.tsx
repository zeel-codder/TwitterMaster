import React ,{useEffect, useState} from 'react'
import { GroupSchema } from '../DataType/Feed'
import { Avatar, Button, TextField } from '@material-ui/core';
import Search from '../Same/Search';
import { useRef } from "react";
import { GroupCSchema } from '../DataType/pages';
import { useAppSelector, useAppDispatch } from '../../store';
import { CrateGroup, GetAllGroups } from '../../Actions/Api';
import {useHistory} from 'react-router-dom';






const Group:React.FC<GroupCSchema> =({type,isMe}) =>{
    const newGroup=useRef<HTMLDivElement>(null);

    const List:any=useAppSelector((state)=>state.DataReducer);
    const User=useAppSelector((state)=>state.UserReducer);
    const dispatch=useAppDispatch();

    useEffect(()=>{
        GetAllGroups()
        .then((res)=>{
            console.log(res.data.data);
           dispatch({ type:"AddGroups",data:res.data.data});
        });
    },[]);
    console.log(List)

   

    return (
        <div className="pad">
           
            <h1 className="blue">
                
                {type ||"Groups"}</h1>

            <div className="newGroup newTweetBox" ref={newGroup}>

            <Button  className="cross" variant="contained" color="primary" 
             onClick={()=>{

                // console.log('click')
                newGroup.current?.classList.toggle("shownewTweetBox");
            }}
            >
                x
            </Button>
            <div className="h"></div>

            <GroupDiv />

            </div>


            <Button className="tweet" variant="contained" color="primary"

            onClick={()=>{

                // console.log('click')
                newGroup.current?.classList.toggle("shownewTweetBox");
            }}
            
            
            > <h1>+ Group</h1>
            
            </Button>
            
            
            <Search placeName="Group " />
            {
                List.Groups.map((data:GroupSchema, index :number) => {

                    const {admin,users}=data;
                    if(isMe){
                        if(admin.includes(User._id || "") || users.includes(User._id || "")){
                            return <GroupPeek {...data} ></GroupPeek>
                        }else{
                            
                            return <></>
                        }
                    }else{
                        return <GroupPeek {...data}></GroupPeek>
                    }
                })
            }
                
            
                   
          </div>
        )
}


const GroupPeek: React.FC<GroupSchema>=({title,description}) => {

    return (

        <div className="tweet-container flex">

        <Avatar 
        alt="Remy Sharp" 
        src={"https://images.unsplash.com/photo-1618042164219-62c820f10723?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80"} 
        
        variant='square'
        />


        <div className="flex column start explore">
            <h3>

                
                <a href="/" className="a">
                    #{title}

                </a>
            </h3>

            <div className="Group_Div">
                {description}
            </div>
        </div>
        </div>


    )


}


const GroupDiv: React.FC<{}>=()=>{

    const Data=useAppSelector((state)=>state.GroupCreateReducer);
    const dispatch=useAppDispatch();
    const [message, setMessage] = useState("");
    const history = useHistory();

    useEffect(() => {

        const timeOut = setTimeout(() => {
            setMessage("")
        }, 3000);

        return () => {
            clearTimeout(timeOut);
        }

    }, [message])


    async function handleGroup(){

        if(Data.title==="" || Data.description===""){
            setMessage("Title and Description Must be not have Empty");
            return;
        }

        CrateGroup(Data)
        .then((res)=>{
            window.location.href="/group"
        })
        .catch((e)=>{
            console.log(e)
        })

    }




    return (

        <div>
        <h1 className="center">
            Group
        </h1>


        <div className="flex column auth">

        <span className="textp">

        {message}
        </span>

            <TextField 
                type="string"
                placeholder="Enter Name"
              
                value={Data.title}

                variant="outlined"
             
                required
                onChange={
                    (e)=>{
                        console.log(e)
                        dispatch({type:"ChangeTitle",data:e.target.value})
                    }
                }

                >


            </TextField >


            <TextField 
                type="string"
                placeholder="Enter About"
              
                value={Data.description}

                variant="outlined"
             
                required
                onChange={
                    (e)=>{
                        console.log(e)
                        dispatch({type:"ChangeDescription",data:e.target.value})
                    }
                }

                >


            </TextField >


            <Button 
            variant="contained"
             color="primary" 
             onClick={handleGroup}
             
             >
                            + Create
            </Button>       
        </div>


    </div>
    )
}


export default Group;
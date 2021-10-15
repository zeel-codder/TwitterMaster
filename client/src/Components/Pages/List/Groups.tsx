import React ,{useEffect, useState} from 'react'
import { GroupSchema } from '../../../DataType/Feed'
import { Avatar, Button, TextField } from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../../../store';
import { CrateGroup } from '../../../Actions/Api';
import {useHistory,Link} from 'react-router-dom';
import Loader from '../../Loaders/Loading';




const Groups:React.FC<{DataList:GroupSchema[]}> =({DataList}) =>{

    return (
        <>
         
            {
                DataList.map((data:GroupSchema, index :number) => {
            
        
                        return <GroupPeek {...data}></GroupPeek>
                    
                })
            }

                
</>
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

                
                <Link to={"/group/"+title} className="a">
                    #{title}

                </Link>
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
    const [IsLoading,setLoading]=useState(false);

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
            setLoading(false);
            return;
        }

        CrateGroup(Data)
        .then((res)=>{
            window.location.href="/group"
        })
        .catch((e)=>{
            console.log(e)
        }).finally(()=>{
            setLoading(false);
        })

    }




    return (

        <div>

        {
            IsLoading && <Loader></Loader>
        }
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


export default Groups;
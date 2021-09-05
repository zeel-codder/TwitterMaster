import React from 'react'
import { GroupSchema } from '../DataType/Feed'
import { Avatar, Button, TextField } from '@material-ui/core';
import Search from '../Same/Search';
import { useRef } from "react";
import { GroupCSchema } from '../DataType/pages';






const Group:React.FC<GroupCSchema> =({type}) =>{
    const newGroup=useRef<HTMLDivElement>(null);
    const tem: GroupSchema[] = [
        {
            name: 'tem1',
            tagline: ' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.'
        },
        {
            name: 'tem2'
            ,
            tagline: ' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.,  .'
        },
        {
            name: 'tem3'
            , tagline: ' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.,  .'
        },
        {
            name: 'tem4',
            tagline: ' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.,  .'
        },
        {
            name: 'tem5',
            tagline: ' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.,  .'
        },
        {
            name: 'tem6'
            , tagline: ' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.,  .'
        },

    ]

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
            
            
            <Search placeName="Explore " />
            {
                tem.map((data, index) => {

                    return (

                        <div className="tweet-container flex">

                            <Avatar alt="Remy Sharp" src={data?.img || "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"} />


                            <div className="flex column start explore">
                                <h3>

                                    
                                    <a href="/" className="a">
                                        #_{data.name}

                                    </a>
                                </h3>

                                <div>
                                    {data.tagline}
                                </div>
                            </div>
                            </div>
                    )



                    })
                
            
                        
                    
                    

                }
                   
          </div>
        )
}


const GroupDiv: React.FC<{}>=()=>{

    return (

        <div>
        <h1 className="center">
            Group
        </h1>

        <div className="flex column auth">
        {/* <img className="profile_img" alt="Remy" src="https://zeelcodder.tech/images/home/zeel.jpeg" /> */}


            <TextField 
                type="string"
                placeholder="Enter Name"
              
                value="demo"

                variant="outlined"
             
                required>


            </TextField >

            <Button variant="contained" color="primary" href="#contained-buttons">
                            + Create
                        </Button>




       
        </div>


    </div>
    )
}


export default Group;
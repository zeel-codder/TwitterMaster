import React from 'react'
import { HashTage } from '../DataType/Feed'


export default function Explore() {

    const tem: HashTage[] = [
        {
            name: 'tem1',
            about:' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time'
        },
        {
            name: 'tem2'
            ,
            about:' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time,  .'
        },
        {
            name: 'tem3'
            , about:' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time,  .'
        },
        {
            name: 'tem4',
            about:' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time,  .'
        },
        {
            name: 'tem5',
            about:' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time,  .'
        },
        {
            name: 'tem6'
            , about:' Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time,  .'
        },

    ]

    return (
        <div className="pad">
            <h1>Explore</h1>
            {


                
                tem.map((data,index)=>{
                    
                    return (

        <div className="tweet-container flex  pad">


        <div className="flex column start explore">
            <h3>

            {index+1}. 
            <a href="/" className="a">
            # {data.name}

            </a>
            </h3>

            <div>
                {data.about}
            </div>    
        </div>

           <div className="right">
               <img src={data?.img || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80"} alt="#"></img>
           </div>
        </div>
                        
                        )
                        
                    })
                }
        </div>
    )
}




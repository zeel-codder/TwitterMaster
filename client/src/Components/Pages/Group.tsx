import React from 'react'
import { GroupSchema } from '../DataType/Feed'
import { Avatar } from '@material-ui/core';

export default function Group() {
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
            <h1>Groups You Follow</h1>
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

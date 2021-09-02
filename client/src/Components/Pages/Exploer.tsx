import React from 'react'
import { HashTage } from '../DataType/Feed'


export default function Explore() {

    const tem: HashTage[] = [
        {
            name: 'tem1',
            about:' this aifjie sdjxis ckweimc wesjzfcuws'
        },
        {
            name: 'tem2'
            ,
            about:' this aifjie sdjxis ckweimc wesjzfcuws'
        },
        {
            name: 'tem3'
            , about:' this aifjie sdjxis ckweimc wesjzfcuws'
        },
        {
            name: 'tem4',
            about:' this aifjie sdjxis ckweimc wesjzfcuws'
        },
        {
            name: 'tem5',
            about:' this aifjie sdjxis ckweimc wesjzfcuws'
        },
        {
            name: 'tem6'
            , about:' this aifjie sdjxis ckweimc wesjzfcuws'
        },

    ]

    return (
        <div>
            <h1>Explore</h1>
            {


                
                tem.map((data,index)=>{
                    
                    return (

        <div className="tweet-container">

        <div className="creator-section flex column start">
            <div>

            {index+1}.#
            <a href="#" className="a">
            {data.name}

            </a>
            </div>

            <div>
                {data.about}
            </div>    
        </div>
        </div>
                        
                        )
                        
                    })
                }
        </div>
    )
}




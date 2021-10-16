import React from 'react'
import { GroupSchema } from '../../../DataType/Feed'
import { Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';




const Groups:React.FC<{DataList:GroupSchema[]}> =({DataList}) =>{

    return (
        <>
         
            {
                DataList.map((data:GroupSchema, index :number) => {
            
        
                        return <GroupPeek {...data} key={data._id}></GroupPeek>
                    
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
        src={"https://zeelcodder.tech/images/home/zeel.jpeg"} 
        
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





export default Groups;
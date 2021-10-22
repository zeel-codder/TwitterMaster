import React, { useCallback } from 'react'
import { GroupSchema } from '../../../DataType/Feed'
import { Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';




const Groups:React.FC<{DataList:GroupSchema[]}> =({DataList}) =>{
    const dispatch=useAppDispatch();
    const End:any=useAppSelector((state)=>state.MELReducer);
  
   
    const last=useCallback((node)=>{

        if(!node  || End.end) return;
        
        let observe = new IntersectionObserver((e)=>{
            // console.log('call'
            if(e[0].isIntersecting){
                dispatch({type:"Length_ChangeUserLength",data:DataList.length+5});
            }
        });

        observe.observe(node);

    },[DataList, dispatch, End]);

    return (
        <>
         
            {
                DataList.map((data:GroupSchema, index :number) => {
            
        
                        return (
                            index+3===DataList.length

                            ?
                            <span ref={last}>
                                    
                        
                                    <GroupPeek {...data} key={data._id}></GroupPeek>
                            </span>
                            :
                        
                     
                        <GroupPeek {...data} key={data._id}></GroupPeek>
                        )
                    
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
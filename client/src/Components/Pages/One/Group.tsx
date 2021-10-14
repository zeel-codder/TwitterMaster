import React ,{useEffect, useState} from 'react'
import { Avatar, Button, TextField } from '@material-ui/core';
import { useRef } from "react";
import {useHistory} from 'react-router-dom';





const Group:React.FC<{}> =() =>{
    const newGroup=useRef<HTMLDivElement>(null);

    const [IsLoading,setLoading]=useState(true);
    const [DataList,setDataList]=useState([]);
    

    useEffect(()=>{
       
    },[]);



   

    return (
        <div className="pad">
        </div>    
        )
}




export default Group;
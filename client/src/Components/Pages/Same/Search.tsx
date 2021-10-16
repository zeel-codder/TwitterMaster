import {  TextField } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";


interface SearchBox{
    placeName:undefined | string;
    data ?:any[];
    cb ?: any;
}

const Search:React.FC<SearchBox> = ({placeName,data,cb})=> {

    const isHome=placeName === "Tweet";
    const [query,setQuery]=useState("");
    


    useEffect(()=>{

        if(!query){
            cb(null);
            return;
        }
        const Regex=new RegExp(query,'gi');
    
        const newData=data?.filter((data)=>{
            const title=data?.title || data?.name;
            const description=data?.description ;

        
            return !isHome ?title.match(Regex):description.match(Regex);
        })
        cb(newData);
    },[query])



    return (
        <div className="full flex">


            <TextField

            className="full"
            
            type="string"
            variant="outlined"
            InputProps={{
                endAdornment: (
                 
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  
                )
              }}

              value={query}

              onChange={(e:any)=>setQuery(e.target.value)}

            
            
            placeholder={`Search ${placeName}...`}
            ></TextField>

            
            
        </div>
    )
}

export default Search;

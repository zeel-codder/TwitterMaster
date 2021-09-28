import {  TextField } from '@material-ui/core';
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";




interface SearchBox{
    placeName:undefined | string;
    data ?:undefined | any[];
}





const Search:React.FC<SearchBox> = ({placeName})=> {
    return (
        <div className="full flex">
            {/* <Button className="btn" startIcon={<SearchIcon></SearchIcon>}> */}
                
            {/* </Button> */}

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

            
            
            placeholder={`Search ${placeName}...`}
            ></TextField>

            
            
        </div>
    )
}

export default Search;

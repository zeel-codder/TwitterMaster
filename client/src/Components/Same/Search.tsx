import { Button, TextField } from '@material-ui/core';
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

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

            
            
            placeholder={`👉 find ${placeName}...`}
            ></TextField>

            
            
        </div>
    )
}

export default Search;

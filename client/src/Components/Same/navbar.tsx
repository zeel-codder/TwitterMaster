import { BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExplicitIcon from '@material-ui/icons/Explicit';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import GroupIcon from '@material-ui/icons/Group';
import { useState } from 'react';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {useRef} from 'react';

import {useAppSelector,useAppDispatch} from '../../store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';




import { Link } from 'react-router-dom';


export default function Navbar() {

    // const History = useHistory();

    // const classes = useStyles();
    // const userData:boolean=localStorage.getItem('User')?true:false;
    const user=useAppSelector((state)=>state.UserReducer);
    const dispatch=useAppDispatch();

    const bar=useRef<HTMLDivElement>(null);
    const navbar=useRef<HTMLDivElement>(null);
    
    const User=JSON.parse(localStorage.getItem('User') || '{}')

    if(!user.name  && User.name){
        console.log(User,user)
        dispatch({ type:"AddUser",data:User})
    }

    function handleClick(){
        bar.current?.classList.toggle("spin");
        navbar.current?.classList.toggle("show");
    }
 

    return (
        <div className="flex blue space navbar relative">

            <div className="navbar-right">

                <h2>Twitter Master</h2>

            </div>

            <div className="bar" 
            
            ref={bar}
            onClick={handleClick}
            
            >

                <ArrowBackIosIcon />

            </div>

            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}

           

            <div className="navbar-left" 
            ref={navbar}
            >

                <Link to="/" title="Home" onClick={handleClick}>


                    <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                </Link>

                <Link to="/group" title="Group" onClick={handleClick}>

                    <BottomNavigationAction label="Group" value="/group" icon={<GroupWorkIcon/>} />
                </Link>

                
                <Link to="/users" title="Users" onClick={handleClick}>

                    <BottomNavigationAction label="Users" value="/users" icon={<GroupIcon />} />
                </Link>

                {
                    user.name
                        ?
                        <>
                        
                        <Link to="/profile" title="User" onClick={handleClick}>
                            <BottomNavigationAction label="Profile" value="/profile" icon={<PersonOutlineIcon />} />
                        </Link>

                        <span className="a"
                        
                        onClick={()=>{
                            
                            localStorage.removeItem('User')
                            window.location.href="/"
                            dispatch({type:"AddUser",data:{}});
                            // History.replace('/');
                            
                        }}>Logout </span>
                        </>
                        :
                        <>
                            <Link to="/signin" title="SignIn" className="navbar-link" onClick={handleClick}>


                                SingIn

                            </Link>

                            <Link to="/signup" title="SignUp" className="navbar-link onClick={handleClick}">


                                SingUp

                            </Link>
                        </>
                }



            </div>
            

        </div>
    )
}


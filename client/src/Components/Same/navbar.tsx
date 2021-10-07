import { BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExplicitIcon from '@material-ui/icons/Explicit';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import GroupIcon from '@material-ui/icons/Group';
import { useState } from 'react';

import {useAppSelector,useAppDispatch} from '../../store';




import { Link } from 'react-router-dom';


export default function Navbar() {

    // const History = useHistory();

    // const classes = useStyles();
    // const userData:boolean=localStorage.getItem('User')?true:false;
    const User=useAppSelector((state)=>state.UserReducer);
    const dispatch=useAppDispatch();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('User') || '{}'))
    if(!User.name){
        dispatch({ type:"AddUser",data:user})
    }


    return (
        <div className="flex blue space navbar">

            <div className="navbar-right">

                <h2>Twitter Master</h2>

            </div>

            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}

            <div className="navbar-left">

                <Link to="/" title="Home">


                    <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                </Link>

                <Link to="/explore" title="Explore">
                    <BottomNavigationAction label="Explore" value="/explore" icon={<ExplicitIcon />} />
                </Link>
                <Link to="/group" title="Group">

                    <BottomNavigationAction label="Group" value="/group" icon={<GroupIcon />} />
                </Link>

                {
                    user.name
                        ?
                        <>
                        
                        <Link to="/profile" title="User">
                            <BottomNavigationAction label="Profile" value="/profile" icon={<PersonOutlineIcon />} />
                        </Link>

                        <span className="a"
                        
                        onClick={()=>{

                            localStorage.removeItem('User')
                            setUser({})
                            // History.replace('/');

                        }}>Logout </span>
                        </>
                        :
                        <>
                            <Link to="/signin" title="SignIn" className="navbar-link">


                                SingIn

                            </Link>

                            <Link to="/signup" title="SignUp" className="navbar-link">


                                SingUp

                            </Link>
                        </>
                }



            </div>

        </div>
    )
}


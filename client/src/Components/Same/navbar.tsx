import { BottomNavigation, BottomNavigationAction, colors, TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExplicitIcon from '@material-ui/icons/Explicit';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import GroupIcon from '@material-ui/icons/Group';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Button } from '@material-ui/core';
import {useStyles} from '../../App_M';


import { Link } from 'react-router-dom';


export default function Navbar() {

    const History = useHistory();
    const classes = useStyles();







    const [value, setValue] = useState<string>('home');



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
                <Link to="/profile" title="User">


                    <BottomNavigationAction label="Profile" value="/profile" icon={<PersonOutlineIcon />} />
                </Link>

                <Link to="/signin" title="SignIn" className="navbar-link">

                   
                        SingIn
                   
                </Link>

                <Link to="/signup" title="SignUp" className="navbar-link">

                   
                        SingUp
                    
                </Link>


            </div>

        </div>
    )
}


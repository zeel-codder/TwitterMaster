import { BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import GroupIcon from '@material-ui/icons/Group';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { useRef,useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../../store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';




import { Link } from 'react-router-dom';
import { GetUserByName } from '../../../Actions/Api';


export default function Navbar() {
    const history = useHistory();
    const user = useAppSelector((state) => state.UserReducer);
    const dispatch = useAppDispatch();


    const bar = useRef<HTMLDivElement>(null);
    const navbar = useRef<HTMLDivElement>(null);

    const User = JSON.parse(localStorage.getItem('User') || '{}')
    // console.log(user, User, "Nav");

    if (!User || !User?.name) {
        history.push('/signup');
    }


    useEffect(()=>{
        if(User?.name){

            GetUserByName(User?.name)
            .then((res)=>{
                dispatch({ type: "AddUser", data: res.data.data })
            })
            .catch((e)=>{
                dispatch({ type: "AddUser", data: User })
            })
        }

    },[])






    function handleClick() {
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

                    <BottomNavigationAction label="Group" value="/group" icon={<GroupWorkIcon />} />
                </Link>


                <Link to="/users" title="Users" onClick={handleClick}>

                    <BottomNavigationAction label="Users" value="/users" icon={<GroupIcon />} />
                </Link>

                {
                    user.name
                        ?
                        <>

                            <a href={`/user/${user.name}`} title="User" onClick={handleClick}>
                                <BottomNavigationAction label="Profile" value="/profile" icon={<PersonOutlineIcon />} />
                            </a>

                            <span className="a"

                                onClick={() => {

                                    localStorage.removeItem('User')
                                    window.location.href = "/"
                                    dispatch({ type: "AddUser", data: {} });
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


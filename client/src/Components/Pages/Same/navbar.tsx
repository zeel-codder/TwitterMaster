import { BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import GroupIcon from '@material-ui/icons/Group';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { useRef, useEffect } from 'react';
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


    useEffect(() => {
        if (User?.name) {

            GetUserByName(User?.name)
                .then((res) => {
                    dispatch({ type: "AddUser", data: res.data.data })
                })
                .catch((e) => {
                    localStorage.clear()
                    history.push('/signup');
                })
        }

    }, [])






    // function handleClick() {
    //     bar.current?.classList.toggle("spin");
    //     navbar.current?.classList.toggle("show");
    // }


    return (
        <div className="flex blue space navbar relative">

            <Link to="/" className="navbar-right a">

                <h1>Twitter Master</h1>

            </Link>

            {/* <div className="bar"

                ref={bar}
                onClick={handleClick}

            >

                <ArrowBackIosIcon />

            </div> */}

            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}



            <div className="navbar-left"
                ref={navbar}
            >

                <Link to="/" title="Home" >


                    <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                </Link>

                <Link to="/group" title="Group" >

                    <BottomNavigationAction label="Group" value="/group" icon={<GroupWorkIcon />} />
                </Link>


                <Link to="/users" title="Users" >

                    <BottomNavigationAction label="Users" value="/users" icon={<GroupIcon />} />
                </Link>

                {
                    user.name
                        ?
                        <>

                            <a href={`/user/${user.name}`} title="User" >
                                <BottomNavigationAction label="Profile" value="/profile" icon={<PersonOutlineIcon />} />
                            </a>

                            <span className="a none_m"

                                onClick={() => {

                                    localStorage.removeItem('User')
                                    window.location.href = "/"
                                    dispatch({ type: "AddUser", data: {} });
                                    // History.replace('/');

                                }}>Logout </span>
                        </>
                        :
                        <>
                            {/* <Link to="/signin" title="SignIn" className="navbar-link" >


                                SingIn

                            </Link>

                            <Link to="/signup" title="SignUp" className="navbar-link ">


                                SingUp

                            </Link> */}
                        </>
                }



            </div>


        </div>
    )
}


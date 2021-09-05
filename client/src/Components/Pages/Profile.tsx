import { Avatar, Button, Paper, Tab, Tabs } from '@material-ui/core';
import React, { useRef } from 'react';
import { TextField as Input } from '@material-ui/core';
import Home from './Home';
import Group from './Group';
import { UserData } from '../DataType/Feed'
import { Link, useHistory } from 'react-router-dom';

const Profile: React.FC<UserData> = ({ type }) => {

    const router = useHistory();

    const userprofile=useRef<HTMLDivElement>(null);







    const tab: number = type === "tweet" ? 0 : 1;
    console.log(tab, type);

    return (
        <div>
            <div className="photo">

            <div className="newTweetBox" ref={userprofile}>
            <Button  className="cross" variant="contained" color="primary" 
             onClick={()=>{

                // console.log('click')
                userprofile.current?.classList.toggle("shownewTweetBox");
            }}
            >
                x
            </Button>

            <div className="h"></div>

            <UserDataChnage  />

            </div>


                <div className="creator-section flex">
                    <Avatar alt="Remy Sharp" src="https://zeelcodder.tech/images/home/zeel.jpeg" />
                    <a href="/" className="a">
                        @zeel
                    </a>
                    <div className="end">
                        <Button variant="contained" color="primary"
                         onClick={()=>{

                            // console.log('click')
                            userprofile.current?.classList.toggle("shownewTweetBox");
                        }}
                        
                        
                        >
                            See Profile
                        </Button>
                    </div>
                </div>

                <Paper>
                    <Tabs
                        value={tab}

                        indicatorColor="primary"
                        textColor="primary"
                        centered

                        className="flex br-remove"

                        onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
                            console.log(newValue)
                            if (newValue === 0) {

                                router.replace('/profile')
                            } else {
                                router.replace('/profile/group')

                            }
                        }}
                    >

                        <Tab label="tweet" />
                        <Tab label="group" />


                    </Tabs>
                </Paper>

                {

                    type === "tweet"
                        ?
                        <Home type="Your Tweets" />
                        :
                        <Group type="Group You are in"></Group>


                }

            </div>
        </div>
    )
}



const UserDataChnage: React.FC<{}> = () => {

    return (
        <div>
            <h1 className="center">
                User Data
            </h1>

            <div className="flex column auth">
            <img className="profile_img" alt="Remy" src="https://zeelcodder.tech/images/home/zeel.jpeg" />


                <Input
                    type="string"
                    placeholder="Enter Name"
                    inputProps={{
                        style: {
                            padding: 10
                        }
                    }}
                    value="demo"

                    variant="outlined"
                    aria-readonly="true"
                    required>


                </Input>





                <Input
                    type="email"
                    placeholder="Email"
                    variant="outlined"
                    inputProps={{
                        style: {
                            padding: 10
                        }
                    }}
                    value="xwsjd@mail"


                    required
                    aria-readonly="true"
                ></Input>

                <div className="flex center">

                    <Link to='/' className="a">Twitter Master</Link>

                </div>
            </div>


        </div>
    )
}


export default Profile;
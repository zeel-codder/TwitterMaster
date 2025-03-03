import { Avatar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
// import { TextField as Input } from '@material-ui/core';
import { UserData } from '../../DataType/Feed'
import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { GetTweetOfUser, GetUserByName, ToggleFollowUser } from '../../Actions/Api';
import Loader from '../Loaders/Loading';
import Tweets from './List/Tweets';
import { UpDateUser } from '../../Actions/Api'
import { UploadImageFile } from '../../Actions/Media'
import Home from './Home';


const Profile: React.FC<UserData> = ({ type }) => {


    const { name } = useParams<{ name: string }>();
    const [isLoadding, setLoading] = useState<boolean>(true);
    const Data: any = useAppSelector((state) => state.ProfileReducer);
    const dispatch = useAppDispatch();
    const User: any = useAppSelector((state) => state.UserReducer);
    const InputImg = useRef<HTMLInputElement>(null)

    
    useEffect(() => {
        console.log(name);
        GetUserByName(name)
            .then((res) => {
                dispatch({ type: "Profile_AddUser", data: res.data.data });
                if (res.data.data.name === User.name) {

                    dispatch({ type: "AddUser", data: res.data.data })

                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])


    function change_DP(event: any) {


        const file = event.target.files[0];
        console.log(event.target.files)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", process.env.REACT_APP_UPLOAD_FILE_PREFIX1 as string)
        data.append("REACT_APP_id", User.name);
        // data.append("invalidate","true");


        setLoading(true)

        UpDateUser(User.name, { image: 'f' })
            .then((res) => {
                UploadImageFile(data)
                    .then((res: any) => {
                        console.log(res.data);
                        UpDateUser(User.name, { image: res.data.secure_url })
                            .then((res) => {

                                // window.location.reload()
                                window.location.reload()

                            })
                    })
            })
            .catch((e: any) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })




    }





    function UserFollowChange(name: string, isAdd: boolean) {

        setLoading(true);
        ToggleFollowUser(name, isAdd)
            .then((res) => {

                console.log(res.data.data)
                dispatch({ type: "AddUser", isFollow:res.data.data.isFollow });

                GetUserByName(name)
                .then((res) => {
                    dispatch({ type: "Profile_AddUser", data: res.data.data });
                    if (res.data.data.name === User.name) {
    
                        dispatch({ type: "AddUser", data: res.data.data })
    
                    }
                })
              
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));

    }









    return (
        <>

            {
                isLoadding
                &&
                <Loader></Loader>

            }

            {

                Data.user != null

                &&



                <div className="tweet-container">
                    <div className="creator-section full space flex">
                        <div className="flex">
                            <Avatar alt="Remy Sharp"
                                src={

                                    "https://res.cloudinary.com/dcgtilnwq/image/upload/v1634646326/Users/" + Data.user.name + ".jpg"


                                }

                            >
                                {Data.user.name?.charAt(0)}
                            </Avatar>
                            <a href={`/user/${name}`} className="a">
                                {`@${name}`}
                            </a>
                        </div>

                        <div className="pad">

                            {


                                User?.name === name
                                    ?
                                    <div className='flex pad'>



                                        <>


                                            <input type="file" className="none"

                                                ref={InputImg}

                                                accept=".jpg"


                                                onChange={(event: any) => {
                                                    change_DP(event);
                                                }}


                                            />
                                            {


                                                !User.image
                                                &&

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {

                                                        InputImg.current?.click();

                                                    }}
                                                >
                                                    Change Dp
                                                </Button>
                                            }
                                        </>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {

                                                localStorage.removeItem('User')
                                                window.location.href = "/"
                                                dispatch({ type: "AddUser", data: {} });
                                                // History.replace('/');

                                            }}
                                        >
                                            LogOut
                                        </Button>
                                    </div>
                                    :
                                    Data?.user.followers.includes(User.name)
                                        ?
                                        <Button
                                            className="FollowBtn"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => UserFollowChange(name as string, false)}

                                        >
                                            unfollow
                                        </Button>
                                        :
                                        <Button
                                            className="FollowBtn"

                                            variant="contained"

                                            color="primary"

                                            onClick={() => UserFollowChange(name as string, true)}
                                        >
                                            follow
                                        </Button>

                            }
                        </div>

                    </div>
                    <div className="UserInfo">



                        <h3>Statistic</h3>
                        <div className="flex space">
                            <Link className="flex column a" to={`/user/${name}`}>

                                <div>Tweets</div>
                                <div>{Data.tweets.length}</div>

                            </Link>
                            <Link className="flex column a" to={`/user/${name}/followers`}>
                                <div>Follower</div>
                                <div>{Data.user.followers?.length}</div>
                            </Link>
                            <Link className="flex column a" to={`/user/${name}/follow`}>
                                <div>Follow</div>
                                <div>{Data.user.follow?.length}</div>
                            </Link>
                        </div>
                    </div>

                    <Home type={`Tweets By ${name}`} isMe={true} name={name}></Home>
                </div>
            }
        </>
    )
}



// const UserDataChnage: React.FC<{}> = () => {

//     const User = useAppSelector((state) => state.UserReducer);
//     console.log(User)

//     return (
//         <div className="box">
//             <h1 className="center">
//                 User Data
//             </h1>

//             <div className="flex column auth">
//                 <img className="profile_img" alt="Remy" src="https://zeelcodder.tech/images/home/zeel.jpeg" />


//                 <Input
//                     type="string"
//                     placeholder="Enter Name"
//                     inputProps={{
//                         style: {
//                             padding: 10
//                         }
//                     }}
//                     value={User.name}

//                     variant="outlined"
//                     aria-readonly="true"
//                     required>


//                 </Input>





//                 <Input
//                     type="email"
//                     placeholder="Email"
//                     variant="outlined"
//                     inputProps={{
//                         style: {
//                             padding: 10
//                         }
//                     }}
//                     value={User.email}


//                     required
//                     aria-readonly="true"
//                 ></Input>

//                 <div className="flex center">

//                     <Link to='/' className="a">Twitter Master</Link>

//                 </div>


//             </div>


//         </div>
//     )
// }


export default Profile;
import { Avatar} from '@material-ui/core';
import React, { useEffect,  useState } from 'react';
// import { TextField as Input } from '@material-ui/core';
import { UserData } from '../../DataType/Feed'
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { GetTweetOfUser, GetUserByName } from '../../Actions/Api';
import Loader from '../Loaders/Loading';
import Tweets from './List/Tweets';


const Profile: React.FC<UserData> = ({ type }) => {


    const { name } = useParams<{ name: string }>();
    const [isLoadding, setLoading] = useState<boolean>(true);
    const Data:any=useAppSelector((state)=>state.ProfileReducer);
    const dispatch=useAppDispatch();

    useEffect(() => {
        GetUserByName(name)
            .then((res) => {
                dispatch({type:"Profile_AddUser",data:res.data.data});
                dispatch({ type: "AddUser", data: res.data.data })
            
            })
            .then(() => {
                GetTweetOfUser(name)
                    .then((res) => {
                        dispatch({type:"Profile_AddTweets",data:res.data.data});
                    })
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])









    return (
        <>

            {
                isLoadding
                    ?
                    <Loader></Loader>

                    :
                    <div className="tweet-container">
                         <div className="creator-section flex">
                            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
                            <a href={`/user/${name}`} className="a">
                                {`@${name}`}
                            </a>

                        </div>
                        <div className="UserInfo">

                            <span>Name: {name}</span>
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
                        <h1>Tweets By {name}</h1>
                        <Tweets DataList={Data.tweets}></Tweets>
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
import React, { useEffect, useState } from 'react';
import { UserData } from '../../../DataType/Feed'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { GetTweetOfUser, GetUserByName } from '../../../Actions/Api';
import Loader from '../../Loaders/Loading';
import Users from '../List/Users';


const Profile: React.FC<UserData> = () => {


    const { name, type } = useParams<{ name: string, type: string }>();
    const [isLoadding, setLoading] = useState<boolean>(true);
    const Data: any = useAppSelector((state) => state.ProfileReducer);
    const dispatch = useAppDispatch();


    

    useEffect(() => {




        GetUserByName(name)
            .then((res) => {
                dispatch({ type: "Profile_AddUser", data: res.data.data });
            })
            .then(() => {
                GetTweetOfUser(name)
                    .then((res) => {
                        dispatch({ type: "Profile_AddTweets", data: res.data.data });
                    })
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }

        , [])









    return (
        <div>

            {
                isLoadding
                    ?
                    <Loader></Loader>

                    :
                    <div className="tweet-container">

                        <Users List={Data.user[type].map((value: string) => {
                            return { name: value }

                        })}></Users>

                    </div>
            }
        </div>
    )
}





export default Profile;
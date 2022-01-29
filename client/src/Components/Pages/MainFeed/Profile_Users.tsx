import React, { useEffect, useState } from 'react';
import { UserData } from '../../../DataType/Feed'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { GetTweetOfUser, GetUserByName } from '../../../Actions/Api';
import Loader from '../../Loaders/Loading';
import Users from '../List/Users';
import Page404 from '../404';
import Search from '../Same/Search';



const Profile: React.FC<UserData> = () => {


    const { name, type } = useParams<{ name: string, type: string }>();
    const [isLoadding, setLoading] = useState<boolean>(true);
    const Data: any = useAppSelector((state) => state.ProfileReducer);
    const dispatch = useAppDispatch();
    // console.log()
    const [DataList,setDataList]  =useState([]);

    function handleSearch(data: any[]) {
        if (data == null) {
            return setDataList(Data.user[type].map((value: string) => {
                return { name: value }
            }));
        }
        const newData: any[] = data;
        setDataList(newData as any);
    }





    useEffect(() => {
        GetUserByName(name)
            .then((res) => {
                dispatch({ type: "Profile_AddUser", data: res.data.data });
                setDataList(Data.user[type].map((value: string) => {
                    return { name: value }
                }));
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
                    <>

                    <Search placeName="Users" cb={handleSearch} data={DataList} />

                    {
                        DataList.length===0 && <Page404/>
                    }
                    
                    <div className="tweet-container">

                        <Users DataList={DataList} show_toggle={true}></Users>

                    </div>
                    </>
            }
        </div>
    )
}





export default Profile;
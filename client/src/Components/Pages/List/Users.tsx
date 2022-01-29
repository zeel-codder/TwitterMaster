import React, { useCallback, useState } from 'react';
// import {  Button } from '@material-ui/core';
// import Search from '../Same/Search';
import { UserData } from '../../../DataType/Feed';
import { useAppDispatch, useAppSelector } from '../../../store';
import { ToggleFollowUser } from '../../../Actions/Api';
import Loader from '../../Loaders/Loading';

import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { Button } from '@material-ui/core';

const Group: React.FC<{ DataList: UserData[], show_toggle?: boolean }> = ({ DataList, show_toggle }) => {


    const dispatch = useAppDispatch();
    const End: any = useAppSelector((state) => state.MELReducer);


    const last = useCallback((node) => {

        if (!node || End.end) return;

        let observe = new IntersectionObserver((e) => {
            // console.log('call'
            if (e[0].isIntersecting) {
                dispatch({ type: "Length_ChangeUserLength", data: DataList.length + 10 });
            }
        });

        observe.observe(node);

    }, [DataList, dispatch, End]);





    // console.log(Data);



    return (
        <div className="pad">

            {
                DataList.map((data: UserData, index: number) => {
                    return (

                        index + 3 === DataList.length

                            ?
                            <span ref={last}>

                                <User {...data} key={data._id} show_toggle={show_toggle}></User>
                            </span>
                            :

                            <User {...data} key={data._id} show_toggle={show_toggle}></User>
                    )
                })
            }
        </div>
    )
}


const User: React.FC<UserData> = (props) => {

    const { name, show_toggle } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [Data, setData] = useState<UserData>(props);
    const user = useAppSelector(state => state.UserReducer);
    const [isFollow, setIsFollow] = useState<{}>(show_toggle ? user.follow?.includes(name || '') : Data?.isFollow);
    const userName = user.name;


    // console.log(isFollow);


    function UserFollowChange(name: string, isAdd: boolean) {

        setIsLoading(true);
        ToggleFollowUser(name, isAdd)
            .then((res) => {

                setData(res.data.data);
                //console.log(res.data.data)
                setIsFollow(res.data.data?.isFollow);

            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false));

    }

    // if(userName===name){
    //     return <></>
    // }

    // console.log(user.follow?.includes(name || '') + " " + name);
    // console.log(user, show_toggle)


    return (

        <div className="tweet-container flex">

            {isLoading && <Loader></Loader>}

            <Avatar alt="Remy Sharp"
                src={

                    "https://res.cloudinary.com/dcgtilnwq/image/upload/v1634646326/Users/" + name + ".png"


                }
                sx={{ bgcolor: deepPurple[500] }}

            >
                {name?.charAt(0)}
            </Avatar>


            <div className="flex column start explore">
                <h3 className="flex space full">


                    <a href={`/user/${name}`} className="a">
                        @{name}
                    </a>

                    {
                        !(userName === name)

                        &&

                        <>

                            {
                                isFollow

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
                        </>



                    }
                </h3>

            </div>
        </div>


    )


}




export default Group;

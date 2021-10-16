import React, { useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import Search from '../Same/Search';
import { UserData } from '../../../DataType/Feed';
import { useAppSelector } from '../../../store';






const Group: React.FC<{ List: UserData[] }> = ({ List }) => {

    const [DataList, setDataList] = useState<UserData[]>(List);




    function handleSearch(data: any[]) {
        if (data == null) {
            return setDataList(List);
        }
        const newData: any[] = data;
        setDataList(newData as any);
        // console.log(data);
    }

    // console.log(Data);



    return (
        <div className="pad">

            <h1 className="blue">

                Users

            </h1>



            <Search placeName="Users" cb={handleSearch} data={DataList} />


            {
                DataList.map((data: UserData, index: number) => {


                    return <User {...data}></User>

                })
            }



        </div>
    )
}


const User: React.FC<UserData> = ({ name }) => {
    const Data: any = useAppSelector((state) => state.UserReducer);

    console.log(Data,name)


    return (

        <div className="tweet-container flex">

            <Avatar
                alt="Remy Sharp"
                src={"https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"}

                variant='square'
            />


            <div className="flex column start explore">
                <h3 className="flex space full">


                    <a href={`/user/${name}`} className="a">
                        @{name}
                    </a>

                    <>

                    {
                    
                            Data?.follow?.includes(name)
                            ?
                            <Button className="FollowBtn" variant="contained" color="primary">
                                unfollow
                            </Button>
                            :
                            <Button className="FollowBtn" variant="contained" color="primary">
                                follow
                            </Button>
                    }
                    </>




                </h3>
            </div>
        </div>


    )


}




export default Group;
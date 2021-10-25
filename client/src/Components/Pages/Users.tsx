import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { GetUsers } from '../../Actions/Api';
import Loader from '../Loaders/Loading';
import UserList from './List/Users';
import Search from './Same/Search';




const Group: React.FC<{}> = () => {


    const List: any = useAppSelector((state) => state.DataReducer);
    const MEL: any = useAppSelector((state) => state.MELReducer);
    const [DataList, setDataList] = useState<any[]>([]);
    const Length: any = useAppSelector((state) => state.LengthReducer);
    const dispatch = useAppDispatch();

    function GetDataList() {


        GetUsers(Length.UserLength)
            .then((res: any) => {

                setDataList([...DataList, ...res.data.data.List]);
                if (res.data.data.isEnd) {
                    dispatch({ type: "ChangeEnd", data: true })
                }
                dispatch({ type: "AddUsers", data: [...DataList, ...res.data.data.List] });
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                if (MEL.load) {
                    dispatch({ type: "ChangeLoad", data: false });
                }
                console.log('end')
            })

    }

    useEffect(() => {

        setDataList([])
        dispatch({ type: "Length_ChangeUserLength", data: 10 });
        dispatch({ type: "ChangeLoad", data: true })
        dispatch({ type: "ChangeEnd", data: false })
        GetDataList()



    }, [])

    useEffect(() => {


        if (!MEL.end) {
            GetDataList()
        }

    }, [Length])


    // console.log(List)


    function handleSearch(data: any[]) {
        if (data == null) {
            return setDataList(List.Users);
        }
        const newData: any[] = data;
        setDataList(newData as any);
        // console.log(data);
    }



    return (
        <div>

            {

                MEL.load
                    ?
                    <Loader />
                    :

                    <>
                        <h1 className="blue">

                            Users
                        </h1>
                        <Search placeName="Users" cb={handleSearch} data={DataList} />
                        <UserList DataList={DataList}></UserList>

                    </>
            }



        </div>
    )
}







export default Group;
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store';
import { GroupSchema, TweetSchema } from '../../../DataType/Feed';
import {  GetGroupsByIds,GetGroupByName } from '../../../Actions/Api';
import Loader from '../../Loaders/Loading';
import Tweets from '../List/Tweets';
import Search from '../Same/Search';
import Page404 from '../404';
import {
    useParams
} from "react-router-dom";




const Group: React.FC<{}> = () => {

    const { name } = useParams<{ name: string }>();

    const List: any = useAppSelector((state) => state.DataReducer);
    const End: any = useAppSelector((state) => state.MELReducer);
    const Length: any = useAppSelector((state) => state.LengthReducer);
    const dispatch = useAppDispatch();
    const [IsLoading, setLoading] = useState<boolean>(true);
    const [DataList, setDataList] = useState<TweetSchema[]>([]);
    const [DataMain, setDataMain] = useState<TweetSchema[]>([]);
    const [GroupData,setGroupData]=useState<GroupSchema | null>(null);




    const SetList = () => {
        GetGroupsByIds(name,Length.TweetLength)
            .then((res) => {
                console.log(res.data.data);
                setDataList([...DataList,...res.data.data.List]);
                setDataMain([...DataList,...res.data.data.List]);
                if (res.data.data.isEnd) {
                    dispatch({ type: "ChangeEnd", data: true })
                }
            })
            .catch((e) => {
                console.log(e);
            }).finally(() => {
                setLoading(false);
            })

    }

    useEffect(() => {
        if (!End.end ) {
            SetList()
        }
    }, [Length])

    useEffect(() => {
        setDataList([])

        dispatch({ type: "Length_ChangeTweetLength", data: 10 });
        dispatch({ type: "ChangeEnd", data: false })
        console.log('call empty')
        SetList()

        GetGroupByName(name)
        .then((res)=>{

            setGroupData(res.data.data);

        })
        .catch((e)=>{
            console.log(e);
        })


    }, [])

    



    // useEffect(()=>{
    //     if(List.Groups.length===0){
    //         AllGroups()
    //         .then((res)=>{
    //             console.log(res.data.data);
    //             dispatch({ type:"AddGroups",data:res.data.data});  
    //             SetList(res.data.data);
    //         })
    //         .catch((e)=>{
    //             console.log(e);
    //         }).finally(()=>{
    //             setLoading(false);
    //         })
    //     }else{
    //         SetList(List.Groups);
    //     }
    //     console.log('change')
    //     },[]);

    //     if(!name){
    //         return <Page404></Page404>
    //     }

    function handleSearch(data: TweetSchema[]) {
        if (data == null) {
            return setDataList(DataMain);
        }
        const newData: any[] = data;
        setDataList(newData as any);

    }






    return (
        <div className="pad">
            <h1 className="blue">

                {name}
            </h1>

            <div className="Group_Div">
                    {GroupData?.description}
            </div>

            <Search placeName="Tweet" data={DataList} cb={handleSearch} />


            {
                IsLoading

                    ?
                    <Loader></Loader>
                    :

                    <>

                        {
                            DataList.length === 0
                                ?
                                <Page404></Page404>
                                :
                                <Tweets DataList={DataList}></Tweets>
                        }

                    </>
            }


        </div>
    )
}




export default Group;
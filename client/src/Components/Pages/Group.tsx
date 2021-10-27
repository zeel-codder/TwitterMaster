import React, { useEffect, useState } from 'react'
import { GroupSchema } from '../../DataType/Feed'
import { Button, TextField } from '@material-ui/core';
import Search from './Same/Search';
import { useRef } from "react";
import { GroupCSchema } from '../../DataType/pages';
import { useAppSelector, useAppDispatch } from '../../store';
import { CrateGroup, GetAllGroups } from '../../Actions/Api';
import Loader from '../Loaders/Loading';
import Groups from './List/Groups';




const Group: React.FC<GroupCSchema> = ({ type, isMe }) => {
    const newGroup = useRef<HTMLDivElement>(null);

    const List: any = useAppSelector((state) => state.DataReducer);

    const MEL: any = useAppSelector((state) => state.MELReducer);
    const Length: any = useAppSelector((state) => state.LengthReducer);
    const dispatch = useAppDispatch();
    const [DataList, setDataList] = useState<GroupSchema[]>([]);

    function GetDataList() {
        GetAllGroups(Length.GroupLength)
            .then((res) => {


                setDataList([...DataList,...res.data.data.List]);
                if (res.data.data.isEnd) {
                    dispatch({ type: "ChangeEnd", data: true })
                }

                dispatch({ type: "AddGroups", data: [...DataList,...res.data.data.List] });
            }).catch((e) => console.log(e))
            .finally(() => {



                dispatch({ type: "ChangeLoad", data: false })
            })


    }


    useEffect(() => {

        

        
        setDataList([])
        dispatch({ type: "Length_ChangeUserLength", data: 10 });
        dispatch({ type: "ChangeEnd", data: false })
        dispatch({ type: "AddGroups", data: [] });

            GetDataList()
      


    }, [])



    useEffect(() => {

        console.log('call')

        if (!MEL.end) {
            GetDataList()
        }

    }, [Length])
    // console.log('call2');

    function handleSearch(data: any[]) {
        if (data == null) {
            return setDataList(List.Groups);
        }
        const newData: any[] = data;
        setDataList(newData as any);
        // console.log(data);
    }




    return (
        <div className="pad">
            <h1 className="blue">

                {type || "Groups"}</h1>

            <Search placeName="Group" data={DataList} cb={handleSearch} />


            {
                MEL.load

                    ?
                    <Loader></Loader>
                    :

                    <>


                        <div className="newGroup newTweetBox" ref={newGroup}>

                            <Button className="cross" variant="contained" color="primary"
                                onClick={() => {

                                    // console.log('click')
                                    newGroup.current?.classList.toggle("shownewTweetBox");
                                }}
                            >
                                x
                            </Button>
                            <div className="h"></div>

                            <GroupDiv />

                        </div>


                        <Button className="tweet" variant="contained" color="primary"

                            onClick={() => {

                                // console.log('click')
                                newGroup.current?.classList.toggle("shownewTweetBox");
                            }}


                        > <h1>+ <span className="none_m">Group</span></h1>

                        </Button>

                        <Groups DataList={DataList}></Groups>


                    </>
            }


        </div>
    )
}





const GroupDiv: React.FC<{}> = () => {

    const Data = useAppSelector((state) => state.GroupCreateReducer);
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const [IsLoading, setLoading] = useState(false);

    useEffect(() => {

        const timeOut = setTimeout(() => {
            setMessage("")
        }, 3000);

        return () => {
            clearTimeout(timeOut);
        }

    }, [message])


    async function handleGroup() {

        if (Data.title === "" || Data.description === "") {
            setMessage("Title and Description Must be not have Empty");
            
            return;
        }

        setLoading(true);

        CrateGroup(Data)
            .then((res) => {
                window.location.href = "/group"
            })
            .catch((e) => {
                console.log(e)
            }).finally(() => {
                setLoading(false);
            })

    }




    return (

        <div>

            {
                IsLoading && <Loader></Loader>
            }
            <h1 className="center">
                Group
            </h1>


            <div className="flex column auth">

                <span className="textp">

                    {message}
                </span>

                <TextField
                    type="string"
                    placeholder="Enter Name"

                    value={Data.title}

                    variant="outlined"

                    required
                    onChange={
                        (e) => {
                            console.log(e)
                            dispatch({ type: "ChangeTitle", data: e.target.value })
                        }
                    }

                >


                </TextField >


                <TextField
                    type="string"
                    placeholder="Enter About"

                    value={Data.description}

                    variant="outlined"

                    required
                    onChange={
                        (e) => {
                            console.log(e)
                            dispatch({ type: "ChangeDescription", data: e.target.value })
                        }
                    }

                >


                </TextField >


                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGroup}

                >
                    + Create
                </Button>
                <h1></h1>
                <h1></h1>
            </div>


        </div>
    )
}
export default Group;
import React, { useCallback } from 'react'
import { GroupSchema } from '../../../DataType/Feed'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import Avatar from '@mui/material/Avatar';
import {  deepPurple } from '@mui/material/colors';





const Groups: React.FC<{ DataList: GroupSchema[] }> = ({ DataList }) => {
    const dispatch = useAppDispatch();
    const End: any = useAppSelector((state) => state.MELReducer);


    const last = useCallback((node) => {

        if (!node || End.end) return;

        let observe = new IntersectionObserver((e) => {
            // console.log('call'
            if (e[0].isIntersecting) {
                dispatch({ type: "Length_ChangeUserLength", data: DataList.length + 5 });
            }
        });

        observe.observe(node);

    }, [DataList, dispatch, End]);

    return (
        <>

            {
                DataList.map((data: GroupSchema, index: number) => {


                    return (
                        index + 3 === DataList.length

                            ?
                            <span ref={last}>


                                <GroupPeek {...data} key={data._id}></GroupPeek>
                            </span>
                            :


                            <GroupPeek {...data} key={data._id}></GroupPeek>
                    )

                })
            }


        </>
    )
}


const GroupPeek: React.FC<GroupSchema> = ({ title, description }) => {

    return (

        <div className="tweet-container flex">

            <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {title?.charAt(0)}
            </Avatar>

            <div className="flex column start explore">
                <h3>


                    <Link to={"/group/" + title} className="a">
                        #{title}

                    </Link>
                </h3>

            </div>
        </div>


    )


}





export default Groups;
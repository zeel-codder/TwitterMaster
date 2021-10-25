import React, { useCallback, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import Search from '../Same/Search';
import { UserData } from '../../../DataType/Feed';
import { useAppDispatch, useAppSelector } from '../../../store';
import { ToggleFollowUser } from '../../../Actions/Api';
import Loader from '../../Loaders/Loading';



const Group: React.FC<{ DataList: UserData[] }> = ({ DataList }) => {


    const dispatch=useAppDispatch();
    const End:any=useAppSelector((state)=>state.MELReducer);
  
   
    const last=useCallback((node)=>{

        if(!node  || End.end) return;
        
        let observe = new IntersectionObserver((e)=>{
            // console.log('call'
            if(e[0].isIntersecting){
                dispatch({type:"Length_ChangeUserLength",data:DataList.length+10});
            }
        });

        observe.observe(node);

    },[DataList, dispatch, End]);

    



    // console.log(Data);



    return (
        <div className="pad">
  
            {
                DataList.map((data: UserData, index: number) => {
                    return (

                        index+3===DataList.length

                        ?
                        <span ref={last}>
                                
                    <User {...data} key={data._id}></User>
                        </span>
                        :
                    
                    <User {...data} key={data._id}></User>
                    )
                })
            }
        </div>
    )
}


const User: React.FC<UserData> = ({ name }) => {
    const Data: any = useAppSelector((state) => state.UserReducer);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // console.log(Data,name)

    function UserFollowChange(name: string, isAdd: boolean) {

        setIsLoading(true);
        ToggleFollowUser(name, isAdd)
            .then((res) => {

                dispatch({ type: "AddUser", data: res.data.data });

            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false));

    }


    return (

        <div className="tweet-container flex">

            {isLoading && <Loader></Loader>}

            <Avatar alt="Remy Sharp"
                src={

                    "https://res.cloudinary.com/dcgtilnwq/image/upload/v1634646326/Users/" + name + ".png"


                }

            >
                {name?.charAt(0)}
            </Avatar>


            <div className="flex column start explore">
                <h3 className="flex space full">


                    <a href={`/user/${name}`} className="a">
                        @{name}
                    </a>

                    <>

                        {

                            Data?.follow?.includes(name)
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




                </h3>
            </div>
        </div>


    )


}




export default Group;
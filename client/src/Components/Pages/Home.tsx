import React from "react";
import { TweetSchema } from "../../DataType/Feed";
import { Button } from "@material-ui/core";
import Search from './Same/Search';
import NewTweet from './helper/tweet';
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { HomeSchema } from '../../DataType/pages';
import { GetTweetOfUser, GetUserTweetList } from "../../Actions/Api";
import { useAppSelector, useAppDispatch } from '../../store';
import Loader from '../Loaders/Loading';
import Tweets from './List/Tweets';





const Home: React.FC<HomeSchema> = ({ type, isMe, name }) => {
    // console.log('Home')

    const newTweet = useRef<HTMLDivElement>(null);
    const List: any = useAppSelector((state) => state.DataReducer);
    const End: any = useAppSelector((state) => state.MELReducer);
    const Length: any = useAppSelector((state) => state.LengthReducer);
    const dispatch = useAppDispatch();
    const [IsLoading, setLoading] = useState(true);
    const [DataList, setDataList] = useState<TweetSchema[]>([]);



    function GetDataList() {
        if (isMe) {

            GetTweetOfUser(name, Length.TweetLength)
                .then(res => {
                    setDataList([...DataList, ...res.data.data.List]);
                    if (res.data.data.isEnd) {
                        dispatch({ type: "ChangeEnd", data: true })
                    }

                    dispatch({ type: "Profile_AddTweets", data: res.data.data.List });
                }).catch((e) => {
                    console.log(e);
                }).finally(() => {
                    setLoading(false);
                })


        } else {

            console.log('call data');
            GetUserTweetList(Length.TweetLength)
                .then(res => {


                    setDataList([...DataList, ...res.data.data.List]);
                    if (res.data.data.isEnd) {
                        dispatch({ type: "ChangeEnd", data: true })
                    }

                    dispatch({ type: "AddTweets", data: [...DataList, ...res.data.data.List] })
                }).catch((e) => {
                    console.log(e);
                }).finally(() => {
                    setLoading(false);
                })
        }


    }


    useEffect(() => {

        setDataList([])
        dispatch({ type: "Length_ChangeTweetLength", data: 10 });
        dispatch({ type: "ChangeEnd", data: false })
        console.log('call empty')
        GetDataList()
    }, [])




    useEffect(() => {



        if (!End.end) {
            GetDataList()
        }

    }, [Length])



    function handleSearch(data: any[]) {
        if (data == null) {
            return setDataList(List.Tweets);
        }
        const newData: any[] = data;
        setDataList(newData as any);
        // console.log(data);
    }








    return (
        <div >
            <h1> {type || 'Home'}</h1>

            {/* <Search placeName="Tweet" cb={handleSearch} data={DataList} /> */}
            {
                IsLoading
                &&
                <Loader></Loader>
            }
            <>

                <div className="newTweetBox" ref={newTweet}>
                    <Button className="cross" variant="contained" color="primary"
                        onClick={() => {

                            // console.logx('click')
                            newTweet.current?.classList.toggle("shownewTweetBox");
                        }}
                    >
                        x
                    </Button>

                    <div className="h relative"></div>

                    <NewTweet close={newTweet} load={setLoading} />

                </div>

                <Button className="tweet" variant="contained" color="primary"

                    onClick={() => {

                        // console.log('click')
                        newTweet.current?.classList.toggle("shownewTweetBox");
                    }}


                > <h1># <span className="none_m">Tweet</span></h1>

                </Button>
                <Tweets DataList={DataList}></Tweets>
            </>


        </div>
    )
}



export default Home;
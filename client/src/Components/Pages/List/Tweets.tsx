import React, { useState } from "react";
import { TweetSchema } from "../../../DataType/Feed";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import { Avatar } from "@material-ui/core";
// import { Share } from "@material-ui/icons";
import { DeleteTweet, UpdateTweet } from "../../../Actions/Api";
import { useAppSelector } from '../../../store';
import Loader from '../../Loaders/Loading';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import CancelIcon from '@mui/icons-material/Cancel';
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Comment } from '../MainFeed/Tweet';


interface TweetsSchema {
    DataList: TweetSchema[];
}



const Tweets: React.FC<TweetsSchema> = ({ DataList }) => {

    return (
        <>
            {
                DataList.map((data: TweetSchema) => {

                    const comments = data.comments?.slice(0, 2) || [];


                    return (
                        <div className="padtweet">
                            <Tweet {...data} key={data._id}></Tweet>

                            {
                                comments.length !== 0
                                &&
                                <div>
                                    <h4 className="a">Comments</h4>
                                </div>

                            }

                            <div className="commentsList">



                                {
                                    comments.map((data) => {

                                        return (<Comment isPick={true} {...data} key={data._id}></Comment>)

                                    })
                                }
                            </div>
                            <div className="flex full">


                                {/* <Link className="a" to={`/tweet/${data._id}`}>

                                    <Button variant="contained" color="primary"


                                    > Go To Tweet

                                    </Button>
                                </Link> */}
                            </div>



                        </div>
                    )
                }
                )
            }

        </>

    )
}

const Tweet: React.FC<TweetSchema> = (prpos: TweetSchema) => {



    const { _id, image, video, creator, description, like, retweet, Creator_ID, Creator_Name, groups,url } = prpos;
    const User = useAppSelector((state) => state.UserReducer);
    const type = { _id, user_id: User._id, type: "" };
    const [TweetData, setTweetData] = useState<any>({ _id, image, video, creator, description, like, retweet, Creator_ID, Creator_Name,url });
    const [isLike, setIsLike] = useState(like?.includes(User._id as string));
    const [Like, setLike] = useState(like?.length);
    const [Retweet, setReteet] = useState(retweet);
    const [IsLoading, setLoading] = useState(false);
    const groupList: string[] = groups?.split("|") as string[];
    const history = useHistory();
    const LinkShare: string = process.env.REACT_APP_My_WebSite + `/tweet/${_id}`;




    function handleDelete() {

        setLoading(true);

        DeleteTweet(_id as string)
            .then((res) => {

                window.location.reload();

            }).catch((e) => console.log(e))
            .finally(() => setLoading(false))



    }


    function opneTweet() {
        history.push(`/tweet/${_id}`);
    }

    const handleLike = () => {

        if (isLike) {
            type.type = "remove like";
        } else {
            type.type = "like"
        }
        setLoading(true);
        UpdateTweet(type, TweetData)
            .then((res) => {

                setIsLike(!isLike);
                const newTweet = res.data.data;
                setTweetData(newTweet);
                setLike(newTweet.like.length);
                setReteet(newTweet.retweet);
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                setLoading(false);
            })

    }

   

    const handleShare = (Wh: boolean) => {

        type.type = "retweet";
        setLoading(true);

        if (!Wh) {
            window.open('https://twitter.com/intent/tweet?text=Link:' + LinkShare, '_blank')?.focus();
        } else {
            window.open('whatsapp://send?text=See This Link:' + LinkShare, '_blank')?.focus();
 
        }

        UpdateTweet(type, TweetData)
            .then((res) => {
                setIsLike(!isLike);
                const newTweet = res.data.data;
                setTweetData(newTweet);
                setLike(newTweet.like.length);
                setReteet(newTweet.retweet);
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                setLoading(false);
            })

    }


    return (

        <div className="tweet-container pad">

            <div className="flex full space">



                <div className="creator-section flex">
                    <Avatar alt="Remy Sharp" 
                    src={
                
                        "https://res.cloudinary.com/dcgtilnwq/image/upload/v1634646326/Users/"+Creator_Name+".png"
                       
                    
                    }
                    
                    >
                        {Creator_Name?.charAt(0)}
                        </Avatar>
                    <a href={"/user/" + TweetData.Creator_Name} className="a">
                        {TweetData.Creator_Name}
                    </a>
                </div>


                <div className="flex">


                    <CropFreeRoundedIcon className="a" onClick={opneTweet} />

                    {

                        User._id === Creator_ID
                        &&
                        <CancelIcon className="a" onClick={handleDelete}> </CancelIcon>
                    }
                </div>
            </div>

            <div className="text">
                {
                    TweetData.description

                }

               

            </div>

            <div className="text">
                {

                    TweetData.url

                    &&

                    <>
                    
                    Link:
            
                    <a href={TweetData.url} target='_blank'>{TweetData.url}</a>
                    </>
                    
                }
               

            </div>
            <div className="groups">

                {

                    groupList?.map((data, index) => {

                        return (

                            data === ""
                                ?
                                <></>
                                :
                                <a className="a" key={index} href={"/group/" + data}>
                                    #{data}
                                </a>

                        )


                    }
                    )
                }
            </div>

            <div className="media">

                {
                    TweetData.image ? <img src={TweetData.image} alt={TweetData.image} /> : ''
                }
                {
                    TweetData.video ? <video src={TweetData.video} controls></video> : ''
                }
            </div>

            <div className="Socials flex blue">

                <div className="like flex" onClick={handleLike}>

                    {IsLoading && <Loader></Loader>}

                    <FavoriteBorderRoundedIcon />
                    <div className="flex">

                        {Like}
                    </div>
                </div>

                <div className="retweet flex">
                    <ShareRoundedIcon />
                    <div>
                        {Retweet}
                    </div>
                    <WhatsAppIcon onClick={() => handleShare(true)}></WhatsAppIcon>
                    <TwitterIcon onClick={() => handleShare(false)}></TwitterIcon>
                </div>

                {/* <div className="share flex">

                <ExitToAppRoundedIcon  />


                </div> */}
            </div>



        </div>
    )

}

export { Tweet };

export default Tweets;
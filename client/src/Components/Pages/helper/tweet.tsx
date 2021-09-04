import { Button, Input } from '@material-ui/core';
import React from 'react';
import { TweetSchema } from '../../DataType/Feed';
import { useReducer, useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageIcon from '@material-ui/icons/Image';


const NullTweet: TweetSchema = {
    message: '',
    img: '',
    video: '',
    creator: '',
}

interface actionSchema {
    type: undefined | string,
    message?: undefined | string,
    img?: undefined | any,
    video?: undefined | any,
    creator?: undefined | string,
}

const ChangeMessage: string = "1";
const ChangeImg: string = "2";
const ChangeVideo: string = "3";
const ChangeCreator: string = "4";




function reducer(state: TweetSchema, action: actionSchema) {
    switch (action.type) {
        case ChangeMessage:
            return { ...state, message: action.message };
        case ChangeImg:
            return { ...state, img: action.img };
        case ChangeVideo:
            return { ...state, video: action.video };
        case ChangeCreator:
            return { ...state, creator: action.creator };
        default:
            throw new Error();
    }
}



const Tweet = () => {


    const [state, dispatch] = useReducer(reducer, NullTweet);

    const InputImg = useRef<HTMLInputElement>(null)
    const InputVideo = useRef<HTMLInputElement>(null)
    const disImge = useRef<HTMLImageElement>(null);
    const disVideo = useRef<HTMLVideoElement>(null);


    return (
        <div className="flex column pad ">





            <TextareaAutosize className="newtweet_text"

                placeholder="Enter Tweet ...."

                maxRows="10"



                required></TextareaAutosize>

            <div className="flex media relative">

                {
                    state?.img || state?.video

                    ?

                    
                    <Button  className="cross" variant="contained" color="primary" 
                    onClick={()=>{
                        
                // console.log('click')

                dispatch({type:ChangeImg,img:""})
                dispatch({type:ChangeVideo,video:""})
                // newTweet.current?.classList.toggle("shownewTweetBox");
            }}
            >
                X
                </Button>
                :
                ''
            }



                {
                    state?.img
                        ?
                        <img src={state?.img} alt="none"
                            ref={disImge}
                        >

                        </img>
                        :
                        ''
                }
                {
                    state?.video
                        ?
                        <video src={state?.video}
                        controls
                            ref={disVideo}
                        >

                        </video>
                        :
                        ''
                }
            </div>



            <div className="flex blue  icons start_v" >

                <input type="file" className="none"
                    ref={InputImg}

                    onChange={(event: any) => {

                        const file = event.target.files[0];


                        let reader = new FileReader();
                        reader.onload = (e: any) => {
                            // console.log(e)
                            dispatch({ type: ChangeImg, img: e.target.result });
                        };
                        reader.readAsDataURL(event.target.files[0]);



                    }}
                    accept="image/*"

                />




                <input type="file" className="none"
                    ref={InputVideo}

                    onChange={(event:any) => {
                        const file = event.target;

                        let reader = new FileReader();
                        reader.onload = (e: any) => {
                            console.log(e)
                            dispatch({ type: ChangeVideo, video: e.target.result });
                        };
                        reader.readAsDataURL(event.target.files[0]);





                    }}
                    accept="video/mp4"

                />



                <Button
                    onClick={(event) => {

                        if (!state?.img && !state?.video) {


                            InputVideo.current?.click();

                        }


                    }}

                    startIcon={<VideoLibraryIcon />}

                />








                <Button startIcon={<ImageIcon />}
                    onClick={(event) => {

                        if (!state?.img && !state?.video) {


                            InputImg.current?.click();

                        }


                    }}


                />







            </div>
            <Button variant="contained" color="primary" href="#contained-buttons">
                # Tweet
            </Button>

        </div>
    );
}

export default Tweet;

import { Button, Input } from '@material-ui/core';
// import React from 'react';
import { TweetSchema } from '../../DataType/Feed';
import React, { useReducer, useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageIcon from '@material-ui/icons/Image';
import { useHistory } from 'react-router';
import { CreateNewPost } from '../../Actions/Api';
import FormData from 'form-data'


const NullTweet: TweetSchema = {
    description: '',
    image: '',
    video: '',
    creator: '',
}

interface actionSchema {
    type: undefined | string,
    description?: undefined | string,
    image?: undefined | any,
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
            return { ...state, description: action.description };
        case ChangeImg:
            return { ...state, image: action.image };
        case ChangeVideo:
            return { ...state, video: action.video };
        case ChangeCreator:
            return { ...state, creator: action.creator };
        case "Reset":
            return { ...NullTweet }
        default:
            throw new Error();
    }
}



const Tweet: React.FC<{close:React.RefObject<HTMLDivElement>}> = ({close}) => {


    const [state, dispatch] = useReducer(reducer, NullTweet);

    // const text=useRef(null);

    const InputImg = useRef<HTMLInputElement>(null)
    const InputVideo = useRef<HTMLInputElement>(null)
    const disImge = useRef<HTMLImageElement>(null);
    const disVideo = useRef<HTMLVideoElement>(null);

    const history = useHistory();


    const AddTweet = () => {
        console.log(state);

        if (state.description?.length === 0) return;

        console.log('call')


        let formData = new FormData();
        
        const newTweet = { description: state.description, media: state.image || state.video || null };
        formData.append('description', newTweet.description);
        if(newTweet.media!=null)
        formData.append('media', newTweet.media.file,newTweet.media.file.name);

        console.log(newTweet)

        CreateNewPost(formData)
            .then((data) => {
                dispatch({ type: "Reset" });
                window.location.reload();
                close.current?.classList.toggle("shownewTweetBox");

            }).catch(err => console.log(err));



    }


    return (
        <div className="flex column pad ">





            <TextareaAutosize className="newtweet_text"

                placeholder="Enter Tweet ...."

                maxRows="10"

                value={state.description}

        

                onChange={(node)=>{

                
                    dispatch({type:ChangeMessage,description:node.target.value});

                }}



                required></TextareaAutosize>

            <div className="flex media relative">

                {
                    state?.image || state?.video

                        ?


                        <Button className="cross" variant="contained" color="primary"
                            onClick={() => {

                                // console.log('click')

                                dispatch({ type: ChangeImg, image: "" })
                                dispatch({ type: ChangeVideo, video: "" })
                                // newTweet.current?.classList.toggle("shownewTweetBox");
                            }}
                        >
                            X
                        </Button>
                        :
                        ''
                }



                {
                    state?.image
                        ?
                        <img src={state?.image.bit} alt="none"
                            ref={disImge}
                        >

                        </img>
                        :
                        ''
                }
                {
                    state?.video
                        ?
                        <video src={state?.video.bit}
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
                            dispatch({ type: ChangeImg, image: { bit:e.target.result,file:file} });
                        };
                        reader.readAsDataURL(event.target.files[0]);



                    }}
                    accept="image/*"

                />




                <input type="file" className="none"
                    ref={InputVideo}

                    onChange={(event: any) => {
                        const file = event.target.files[0];

                        let reader = new FileReader();
                        reader.onload = (e: any) => {
                            console.log(e)
                            dispatch({ type: ChangeVideo, video: { bit:e.target.result,file:file} });
                        };
                        reader.readAsDataURL(event.target.files[0]);
                    }}
                    accept="video/mp4"

                />



                <Button
                    onClick={(event) => {

                        if (!state?.image && !state?.video) {
                            InputVideo.current?.click();
                        }


                    }}

                    startIcon={<VideoLibraryIcon />}

                />








                <Button startIcon={<ImageIcon />}
                    onClick={(event) => {

                        if (!state?.image && !state?.video) {


                            InputImg.current?.click();

                        }


                    }}


                />







            </div>
            <Button
            variant="contained" 
            color="primary"  
            onClick={AddTweet}
            >
            # Tweet
            </Button>

            {/* <span className="a"
               oncl
            >

            </span> */}

        </div>
    );
}

export default Tweet;

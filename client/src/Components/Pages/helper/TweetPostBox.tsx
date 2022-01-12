import { TextField as Input, Button } from '@material-ui/core';
import React, { useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageIcon from '@material-ui/icons/Image';
import { CreateNewPost } from '../../../Actions/Api';
import FormData from 'form-data'
import Loader from '../../Loaders/Loading';
import { useAppSelector, useAppDispatch } from '../../../store';
import GroupSelect from './GroupSelect';
import { UploadImageFile, UploadVideoFile } from '../../../Actions/Media';
// import { useDispatch } from 'react-redux';
import GifIcon from '@mui/icons-material/Gif';
import { GiphyFetch } from "@giphy/js-fetch-api";
import {Grid} from "@giphy/react-components";




const giphyFetch = new GiphyFetch(process.env.REACT_APP_Gif as string);
/** 
 * Tweet FC is User to Take Input for new Tweet From User. 
 */
const TweetPostBox: React.FC<{ close: React.RefObject<HTMLDivElement>, load: any }> = ({ close, load }) => {


    const state = useAppSelector((state) => state.TweetReducer);
    const dispatch = useAppDispatch();
    const InputImg = useRef<HTMLInputElement>(null)
    const InputVideo = useRef<HTMLInputElement>(null)
    const disImge = useRef<HTMLImageElement>(null);
    const disVideo = useRef<HTMLVideoElement>(null);


    const AddTweet = async () => {

        if (state.description?.length === 0) return;
        load(true);


        try {

            let media_url = '';

            if (state.isImage) {
                let formData: any = new FormData();
                formData.append("file", state.image.file);
                formData.append("upload_preset", process.env.REACT_APP_Demo2 as string)
                const res: any = await UploadImageFile(formData);
                media_url = res.data.secure_url;
            } else if (state.isVideo) {
                let formData: any = new FormData();
                formData.append("file", state.video.file);
                formData.append("upload_preset", process.env.REACT_APP_Demo2 as string)
                const res: any = await UploadVideoFile(formData);
                media_url = res.data.secure_url;
            } else if (state.isGif) {
                media_url = state.Gif;
            }
            // close.current?.classList.toggle("shownewTweetBox");


            const newTweet = {
                description: state.description,
                groups: state.groups,
                media: media_url,
                isImage: state.isImage || state.isGif,
                url: state.url,
            };

            // console.log(newTweet);

            await CreateNewPost(newTweet);
            dispatch({ type: "Reset", data: null });
            window.location.reload();

        } catch (e) {
            console.log(e);
        } finally {
            load(false)
        }
    }


    return (
        <>

            <div className="flex column pad user-tweet">

                <TextareaAutosize
                    className="newtweet_text"
                    placeholder="Enter Tweet(500 char At most) ...."
                    maxRows="10"
                    value={state.description}
                    maxLength={500}
                    onChange={(node) => {
                        dispatch({ type: "ChangeTweetDescription", description: node.target.value });
                    }}
                    required
                    />
                <div className='flex column start full urldiv'>

                    <span className='a'>Add Url</span>

                    <Input

                        type="string"
                        inputProps={{
                            style: {
                                padding: 10
                            }
                        }}
                        variant="outlined"
                        onChange={(event: any) => dispatch({ type: "ChangeTweetUrl", url: event.target.value })}
                        required
                        />
                </div>


                <GroupSelect></GroupSelect>

                {
                    state.GifShow
                    &&
                    <>
                        <div className="flex media full relative">


                            <Button className="cross" variant="contained" color="primary"
                                onClick={() => {

                                    dispatch({ type: "ChangeTweetGifShow", GifShow: false })

                                }}
                            >
                                X
                            </Button>
                        </div>
                        <GridDemo></GridDemo>
                    </>
                }





                <div className="flex media column">

                    {
                        state?.isImage || state?.isVideo || state.isGif

                            ?

                            <div className="flex media full relative">

                                <Button className="cross" variant="contained" color="primary"
                                    onClick={() => {

                                        // console.log('click')

                                        dispatch({ type: "ChangeTweetImage", image: {}, isImage: false })
                                        dispatch({ type: "ChangeTweetVideo", video: {}, isVideo: false })
                                        dispatch({ type: "ChangeTweetGif", Gif: '', isGIF: false })
                                        // newTweet.current?.classList.toggle("shownewTweetBox");
                                    }}
                                >
                                    X
                                </Button>
                            </div>
                            :
                            ''
                    }

                    <div>




                        {
                            state.isImage
                                ?
                                <img src={state.image?.bit} alt="none"
                                    ref={disImge}
                                >

                                </img>
                                :
                                ''
                        }

                        {
                            state.isGif
                                ?
                                <img className='gif-s' src={state.Gif} alt="none"
                                    ref={disImge}
                                >

                                </img>
                                :
                                ''
                        }
                        {
                            state.isVideo
                                ?
                                <video src={state.video?.bit}
                                    controls
                                    ref={disVideo}
                                >

                                </video>
                                :
                                ''
                        }
                    </div>
                </div>




                <div className="flex blue  icons start_v" >

                    <input type="file" className="none"
                        ref={InputImg}
                        accept="image/png,image/jpeg,image/jpg"

                        onChange={(event: any) => {

                            const file = event.target.files[0];


                            let reader = new FileReader();
                            reader.onload = (e: any) => {
                                // console.log(e)
                                dispatch({ type: "ChangeTweetImage", image: { bit: e.target.result, file: file }, isImage: true });
                            };
                            reader.readAsDataURL(event.target.files[0]);



                        }}


                    />




                    <input type="file" className="none"
                        ref={InputVideo}

                        onChange={(event: any) => {
                            const file = event.target.files[0];

                            let reader = new FileReader();
                            reader.onload = (e: any) => {
                                console.log(e)
                                dispatch({ type: "ChangeTweetVideo", video: { bit: e.target.result, file: file }, isVideo: true });
                            };
                            reader.readAsDataURL(event.target.files[0]);
                        }}
                        accept="video/mp4"

                    />

                    <Button startIcon={<ImageIcon />}
                        onClick={(event) => {

                            if (!state?.isImage && !state?.isVideo && !state.isGif) {
                                InputImg.current?.click();
                            }


                        }}


                    />


                    <Button
                        onClick={(event) => {

                            if (!state?.isImage && !state?.isVideo && !state.isGif) {
                                dispatch({ type: "ChangeTweetGifShow", GifShow: true })
                            }


                        }}

                        startIcon={<GifIcon />}

                    />

                    <Button
                        onClick={(event) => {

                            if (!state?.isImage && !state?.isVideo && !state.isGif) {
                                InputVideo.current?.click();
                            }


                        }}

                        startIcon={<VideoLibraryIcon />}

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
        </>
    );
}



// Use To Show Gif's And Also Add In Reducer State.

function GridDemo() {
    const dispatch = useAppDispatch();
    const fetchGifs = (offset: number) =>
        giphyFetch.trending({ offset, limit: 10 });
    const width = window.innerWidth > 750
        ? window.innerWidth * 50 / 100 - 50
        : window.innerWidth * 95 / 100 - 50;


    return (
        <div>
            <Grid
                className="gif"
                onGifClick={
                    (e: any) => {
                        console.log(e)
                        const Link = e.images.downsized_large.url;

                        dispatch({ type: "ChangeTweetGif", Gif: Link, isGif: true })
                        dispatch({ type: "ChangeTweetGifShow", GifShow: false })
                    }
                }
                fetchGifs={fetchGifs}
                width={width}
                columns={3}
                gutter={6}
                noLink={true}
            />
        </div>
    );
}

export default TweetPostBox;

import { Button} from '@material-ui/core';

import React, { useRef,useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImageIcon from '@material-ui/icons/Image';
import { CreateNewPost } from '../../../Actions/Api';
import FormData from 'form-data'
import Loader from '../../Loaders/Loading';
import { useAppSelector, useAppDispatch } from '../../../store';
import GroupSelect from './GroupSelect';
// import { useDispatch } from 'react-redux';




const Tweet: React.FC<{close:React.RefObject<HTMLDivElement>}> = ({close}) => {


    const state=useAppSelector((state)=>state.TweetReducer);
    // const Groups=useAppSelector((state)=>state.DataReducer);
    const dispatch=useAppDispatch();

    // console.log(state)
    // const text=useRef(null);

    const InputImg = useRef<HTMLInputElement>(null)
    const InputVideo = useRef<HTMLInputElement>(null)
    const disImge = useRef<HTMLImageElement>(null);
    const disVideo = useRef<HTMLVideoElement>(null);
    const [IsLoading,setLoading]=useState(false);
    

    // const history = useHistory();


    const AddTweet = () => {
        // console.log(state);

        if (state.description?.length === 0) return;

        console.log('call')


        let formData = new FormData();
        
        const newTweet = { description: state.description ,groups:state.groups,media:state.isImage?state.image:state.isVideo?state.video:null };
        formData.append('description', newTweet.description);
        formData.append('groups', newTweet.groups);

       


        if(newTweet.media!=null)
        formData.append('media', newTweet.media.file,newTweet.media?.file?.name);

        // console.log(newTweet)

        setLoading(true);

        CreateNewPost(formData)
            .then((data) => {
                dispatch({ type: "Reset", data:null });
                setLoading(false)
                window.location.reload();
                close.current?.classList.toggle("shownewTweetBox");

            }).catch(err => console.log(err))
            .finally(()=>setLoading(false));



    }


    return (
        <>
            {IsLoading && <Loader></Loader>}
        <div className="flex column pad user-tweet">






            <TextareaAutosize className="newtweet_text"

                placeholder="Enter Tweet(500 char At most) ...."

                maxRows="10"
                
                value={state.description}
                
                maxLength={500}
                
                
                
                onChange={(node)=>{
                    
                    // console.log('call')

        
                    dispatch({type:"ChangeTweetDescription",description:node.target.value});

                }}



                required></TextareaAutosize>


            <GroupSelect></GroupSelect>


            

            <div className="flex media relative">

                {
                    state?.isImage || state?.isVideo

                    ?


                        <Button className="cross" variant="contained" color="primary"
                            onClick={() => {

                                // console.log('click')

                                dispatch({ type: "ChangeTweetImage", image: {} , isImage:false})
                                dispatch({ type: "ChangeTweetVideo", video: {} , isVideo:false})
                                // newTweet.current?.classList.toggle("shownewTweetBox");
                            }}
                        >
                            X
                        </Button>
                        :
                        ''
                }



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



            <div className="flex blue  icons start_v" >

                <input type="file" className="none"
                    ref={InputImg}
                    accept="image/png,image/jpeg,image/jpg"

                    onChange={(event: any) => {
                        
                        const file = event.target.files[0];
                        
                        
                        let reader = new FileReader();
                        reader.onload = (e: any) => {
                            // console.log(e)
                            dispatch({ type: "ChangeTweetImage", image: { bit:e.target.result,file:file}, isImage:true });
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
                            dispatch({ type: "ChangeTweetVideo", video: { bit:e.target.result,file:file}, isVideo:true });
                        };
                        reader.readAsDataURL(event.target.files[0]);
                    }}
                    accept="video/mp4"
                    
                    />



                <Button
                    onClick={(event) => {
                        
                        if (!state?.isImage && !state?.isVideo) {
                            InputVideo.current?.click();
                        }
                        
                        
                    }}
                    
                    startIcon={<VideoLibraryIcon />}
                    
                    />








                <Button startIcon={<ImageIcon />}
                    onClick={(event) => {
                        
                        if (!state?.isImage && !state?.isVideo) {
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
        </>
    );
}

export default Tweet;

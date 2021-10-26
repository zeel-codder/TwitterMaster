// import React from 'react';
import { Button, TextField as Input } from '@material-ui/core';
import { useState} from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import Loader from '../../Loaders/Loading';
import { SendPassWordResetMail } from '../../../Actions/Api';

const Loading: React.FC<{}> = () => {

    const { token } = useParams<{ token: string }>();
    const MEL:any=useAppSelector((state)=>state.MELReducer);
    const state:any = useAppSelector((state) => state.AuthReducer);
    const dispatch = useAppDispatch()

    function validateEmail(email: string | undefined): boolean {

        const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }



    function handleChange() {

        console.log('call',state)
        if(! validateEmail(state.email)) return;

        dispatch({type:"ChangeLoad",data:true});

        SendPassWordResetMail(state.email as string)
        .then((res)=>{
            console.log(res.data);
            window.location.href="/";
        }).catch((e)=>{
            dispatch({type:"ChangeMessage",data:"Enter Valid Email"})
            setTimeout(()=>{dispatch({type:"ChangeMessage",data:""})},5000);
            console.log(e);
        }).finally(()=>{
            dispatch({type:"ChangeLoad",data:false});
        })

    }





    return (
        <div>
            {

                MEL.load

                &&


                <Loader></Loader>
            }

            <h1 className='full flex'><a className="a" href="/">Twitter Master</a></h1>
            
            <div className="flex column auth">
                <span>The Reset Password Like will send when you enter email and click on send</span>

                {
                    MEL.message  && <span className="red a">{ MEL.message}</span>
                }
            {


                    <>

                        <h3 className="a">Please Enter Email</h3>
                     

                        <Input
                            type="email"
                            placeholder="Email"
                            variant="outlined"
                            inputProps={{
                                style: {
                                    padding: 10
                                }
                            }}

                            onChange={(event: any) => dispatch({ type: "ChangeEmail", email: event.target.value })}

                            required></Input>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleChange}

                        >
                            Send
                        </Button>
                    </>

    

            }
            </div>
        </div>
    );
}

export default Loading;

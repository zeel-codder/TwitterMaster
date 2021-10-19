// import React from 'react';
import { Button, TextField as Input } from '@material-ui/core';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import Loader from '../../Loaders/Loading';
import Page404 from '../404';
import { UpDateUser } from '../../../Actions/Api';

const Loading: React.FC<{}> = () => {

    const { token } = useParams<{ token: string }>();
    const [IsLoading, setLoading] = useState<boolean>(false);
    const state:any = useAppSelector((state) => state.AuthReducer);
    const dispatch = useAppDispatch()



    function handleChange() {

        if(state?.password!=="" && state?.password?.length<=8) return;

        setLoading(true);

        UpDateUser(state.name as string,{"password":state.password})
        .then((res)=>{
            console.log(res.data);
            window.location.href="/";
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        })

    }


    async function SetData() {

        try {


            const user: any = await jwt.verify(token, process.env.REACT_APP_Secrete || "");

            dispatch({ type: "ChangeEmail", email: user.data.email })
            dispatch({ type: "ChangeName", name: user.data.name })
            // console.log(user);
        } catch (e) {

            console.log(e);

        } finally {
            setLoading(false);
        }

    }




    useEffect(() => {

        SetData();


    }, [])

    return (
        <div>
            {

                IsLoading

                &&


                <Loader></Loader>
            }

            <h1 className='full flex'><a className="a" href="/">Twitter Master</a></h1>
            
            <div className="flex column auth">
            {



                state?.name
                    ?
                    <>

                        <h3 className="a">Please Enter New Password {state.name}</h3>
                        <span>Once your password{'(>=9)'} reset you redirect to login page</span>

                        <Input
                            type="password"
                            placeholder="new password"
                            variant="outlined"
                            inputProps={{
                                style: {
                                    padding: 10
                                }
                            }}

                            onChange={(event: any) => dispatch({ type: "ChangePassword", password: event.target.value })}

                            required></Input>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleChange}

                        >
                            Change
                        </Button>
                    </>

                    :
                    <Page404></Page404>

            }
            </div>
        </div>
    );
}

export default Loading;

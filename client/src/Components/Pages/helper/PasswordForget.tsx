// import React from 'react';
import { Button, TextField as Input } from '@material-ui/core';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import Page404 from '../404';
import { UpDateUser } from '../../../Actions/Api';


/**This FC is Used to Update User Password
 * @onSucceed : User will redirect to Login Page
 * @onFailed : Error Message will show on screen
 */


const PasswordForget: React.FC<{}> = () => {

    const { token } = useParams<{ token: string }>();
    const MEL: any = useAppSelector((state) => state.MELReducer);
    const state: any = useAppSelector((state) => state.AuthReducer);
    const dispatch = useAppDispatch();




    function handleChange() {

        if (state?.password !== "" && state?.password?.length <= 8) return;
        dispatch({ type: "ChangeLoad", data: true });


        UpDateUser(state.name as string, { "password": state.password })
            .then((res) => {
                console.log(res.data);
                window.location.href = "/";
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                dispatch({ type: "ChangeLoad", data: false });
            })
    }



    async function SetData() {

        try {
            const user: any = await jwt.verify(token, process.env.REACT_APP_Secrete || "");
            dispatch({ type: "ChangeEmail", email: user.data.email })
            dispatch({ type: "ChangeName", name: user.data.name })

        } catch (e) {

            console.log(e);

        } finally {
            dispatch({ type: "ChangeLoad", data: false });
        }

    }




    useEffect(() => {
        SetData();
    }, [])



    return (
        <div>


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
                                {
                                    MEL.load
                                        ?
                                        'Updating...'
                                        :
                                        'Change'
                                }
                            </Button>
                        </>

                        :
                        <Page404></Page404>

                }
            </div>
        </div>
    );
}

export default PasswordForget;

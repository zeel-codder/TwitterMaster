import React, {  useState, useEffect } from 'react';
import { TextField as Input, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LoginData } from '../../DataType/pages'
import { SingUpRequest,SingInRequest } from '../../Actions/Api';
import {useHistory} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import Loader from '../Loaders/Loading';




const ChangeEmail: string = "ChangeEmail";
const ChangePassword: string = "ChangePassword";
const ChangeCPassword: string = "ChangeCPassword";
const ChangeName: string = "ChangeName";






const Login: React.FC<LoginData> = ({ IsSignUp }) => {



    // const [state, dispatch] = useReducer(reducer, initialState);
    const [message, setMessage] = useState("");
    const history=useHistory();
    const [IsLoading,setLoading]=useState(false);

    const state=useAppSelector((state)=>state.AuthReducer);
    const dispatch = useAppDispatch()
    // console.log(state)
    



    const handleSingUp = async () => {

        // console.log(state);

        if (ValidateSingUp()) {
            try {
                setLoading(true);
                const ans = await SingUpRequest({...state});
                localStorage.setItem('User',JSON.stringify(ans.data.data));
                dispatch({type:"AddUser",data:ans.data.data})
                setLoading(false);
                history.push('/');

            } catch (e) {
                setMessage("User Name our Email is Exits")
                setLoading(false);
            }
        }

    }

    const handleSingIn = async () => {

        // console.log(state);

        if (ValidateSingIn()) {
            try {
                // const hash=await bcrypt.hash(state.password || "",10);
                setLoading(true);
                const ans = await SingInRequest({...state});
                console.log(ans);
                localStorage.setItem('User',JSON.stringify(ans.data.data));
                dispatch({type:"AddUser",data:ans.data.data})
                setLoading(false);
                history.push('/');
            } catch (e) {
                console.log(e)
                setMessage("User Name our Password Wrong")
                setLoading(false);
            }
        }

    }

    useEffect(() => {

        const timeOut = setTimeout(() => {
            setMessage("")
        }, 3000);

        return () => {
            clearTimeout(timeOut);
        }

    }, [message])


    const ValidateSingUp = (): Boolean => {

        if(state.name===""){
            setMessage("Enter user name");
            return false;
        }

        if(!validateEmail(state.email)){
            setMessage("Enter email in write formate")
            return false;
        }

        if(!validatePassword(state.password)){
            setMessage("PassWord Must be minimum eight characters")
            return false;
        }


        return true;
    }
    

    const ValidateSingIn = (): Boolean => {

        if(state.name===""){
            setMessage("Enter user name");
            return false;
        }

        return true;
    }

    function validateEmail(email:string | undefined):boolean {
        
        const re:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password:string |undefined):boolean {

        if(password === undefined) return false;
        return password!=="" && password?.length>8;
    }


    


    return (
        <div>
            <h1 className="center">
                {

                    IsSignUp
                        ?
                        'SignUp'
                        :
                        'SignIn'

                }
            </h1>

            {
                IsLoading && <Loader></Loader>
            }


            <div className="flex column auth">
            <form className="flex column auth">
                <span className="textp">

                    {message}
                </span>

                <Input
                    type="string"
                    placeholder="Enter Name"
                    inputProps={{
                        style: {
                            padding: 10
                        }
                    }}

                    variant="outlined"
                    onChange={(event: any) => dispatch({ type: ChangeName, name: event.target.value })}

                    required></Input>
                {
                    IsSignUp
                        ?
                        
                        <Input
                            type="email"
                            placeholder="Email"
                            variant="outlined"
                            inputProps={{
                                style: {
                                    padding: 10
                                }
                            }}
        
                            onChange={(event: any) => dispatch({ type: ChangeEmail, email: event.target.value })}
        
                            required></Input>
                        :
                        ''

                }




                <Input
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    inputProps={{
                        style: {
                            padding: 10
                        }
                    }}


                    onChange={(event: any) => dispatch({ type: ChangePassword, password: event.target.value })}

                    required></Input>

                {
                    IsSignUp
                        ?
                        <Input
                            type="password"
                            placeholder="Password Again"

                            variant="outlined"
                            inputProps={{
                                style: {
                                    padding: 10
                                }
                            }}

                            onChange={(event: any) => dispatch({ type: ChangeCPassword, confirm_password: event.target.value })}

                            required></Input>

                        :
                        ''

                }


                {
                    IsSignUp
                        ?
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSingUp}

                        >
                            SingUp
                        </Button>
                        :
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSingIn}
                        >
                            SingIn
                        </Button>
                }

</form>
           


                {
                    IsSignUp
                        ?
                        <div className="flex center">

                            <Link to='/signin' className="a"> Have Account ? Sign In</Link>
                        </div>

                        :
                        <div className="flex center">

                            <Link to='/signup' className="a"> Create New Account Sign Up</Link>
                        </div>

                }



                <div className="flex center">

                    <Link to='/' className="a">Twitter Master</Link>

                </div>










            </div>


        </div>
    );
}

export default Login;

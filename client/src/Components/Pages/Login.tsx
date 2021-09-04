import React, { useReducer, useEffect } from 'react';
import { TextField as Input, Button,ButtonGroup } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import {AiOutlineGoogle} from 'react-icons/ai';
import { FaDivide } from 'react-icons/fa';
import {Link} from 'react-router-dom';


interface LoginData {

    IsSignUp: undefined | boolean | string;

}
interface UserData {
    email: undefined | string;
    password: undefined | string;
    confirm_password: undefined | string;
    username: undefined | string;
}

interface action {
    type: undefined | string;
    email?: undefined | string;
    password?: undefined | string;
    confirm_password?: undefined | string;
    username?: undefined | string;
}


const ChangeEmail: string = "ChangeEmail";
const ChangePassword: string = "ChangePassword";
const ChangeCPassword: string = "ChangeCPassword";
const ChangeName: string = "ChangeName";


const initialState: UserData = {

    email: "",
    password: "",
    confirm_password: "",
    username: ""
}

function reducer(state: UserData, action: action) {
    switch (action.type) {
        case ChangeEmail:
            return { ...state, email: action.email };
        case ChangeName:
            return { ...state, username: action.username };
        case ChangePassword:
            return { ...state, password: action.password };
        case ChangeCPassword:
            return { ...state, confirm_password: action.confirm_password };
        default:
            throw new Error();
    }
}



const Login: React.FC<LoginData> = ({ IsSignUp }) => {



    const [state, dispatch] = useReducer(reducer, initialState);


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

            <div className="flex column auth">

                {
                    IsSignUp
                        ?
                        <Input
                            type="string"
                            placeholder="Enter Name"
                            inputProps={{
                                style: {
                                  padding: 10
                                }
                             }}

                            variant="outlined"
                            onChange={(event: any) => dispatch({ type: ChangeName, username: event.target.value })}

                            required></Input>

                        :
                        ''

                }



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
                        <Button variant="contained" color="primary" href="#contained-buttons">
                            SingUp
                        </Button>
                        :
                        <Button variant="contained" color="primary" href="#contained-buttons">
                            SingIn
                        </Button>
                }

                <h3 className="center"> OR </h3>


                    <div className="flex blue full space icons" >

                        <Button 

                        className="flex"
                        startIcon={<FacebookIcon />} 
                        
                        />
                     
                   

                  
                        <Button startIcon={<GitHubIcon />} />
                     
                  


                        <Button startIcon={<AiOutlineGoogle />} />


                   

                    </div>



                  
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

import React from 'react';



interface LoginData{

    IsSignUp:undefined | boolean | string;

}

const Login: React.FC<LoginData> = ({IsSignUp}) => {
    return (
        <div>

            {
            
            IsSignUp 
            ?
            'SignUp'
            :
            'SignIn'
            
            }
            
        </div>
    );
}

export default Login;

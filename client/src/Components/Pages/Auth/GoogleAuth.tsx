import React from 'react';
import { AiOutlineGoogle} from 'react-icons/ai';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Button} from '@material-ui/core';



const GoogleAuth: React.FC<{}> = () => {

  // console.log(process.env.REACT_APP_googleId)
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }
  return (
  

      <GoogleLogin
        clientId={process.env.REACT_APP_googleId || ""}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (

          <Button startIcon={<AiOutlineGoogle />} onClick={renderProps.onClick} disabled={renderProps.disabled} />
        )}
      />

  
  )
}

export default GoogleAuth;


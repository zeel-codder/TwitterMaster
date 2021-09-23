import axios, { AxiosResponse } from 'axios';

import { UserData } from '../DataType/Feed';


const SingUpRequest=(user:UserData) =>axios.post("http://localhost:3001/user/create",user)
const SingInRequest=(user:UserData) =>axios.get("http://localhost:3001/user/"+user.name);
    

export {SingUpRequest,SingInRequest};
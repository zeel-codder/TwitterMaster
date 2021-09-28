import axios from 'axios';

import { UserData } from '../DataType/Feed';


const token:string=JSON.parse(localStorage.getItem('User') || "{}").token || "";

const API = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 200,
    headers: {'authorization': `Bearer ${token}`}
});


const SingUpRequest=(user:UserData) =>axios.post("http://localhost:3001/user/create",user)
const SingInRequest=(user:UserData) =>axios.post("http://localhost:3001/user/singin",user);
const GetUserByName=(name:string) =>axios.get("http://localhost:3001/user/"+name);
const GetUserTweetList=() =>axios.get("http://localhost:3001/tweet");
    

export {SingUpRequest,SingInRequest,GetUserTweetList};
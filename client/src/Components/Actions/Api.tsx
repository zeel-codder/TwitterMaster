import axios from 'axios';

import { UserData } from '../DataType/Feed';

const web=process.env.REACT_APP_WebSite;

console.log(web);


const token:string=JSON.parse(localStorage.getItem('User') || "{}").token || "";

const API = axios.create({
    baseURL:web,
    timeout: 200,
    headers: {'authorization': `Bearer ${token}`}
});


const SingUpRequest=(user:UserData) =>axios.post(web+"/user/create",user)
const SingInRequest=(user:UserData) =>axios.post(web+"/user/singin",user);
const GetUserByName=(name:string) =>axios.get(web+"/user/"+name);
const GetUserTweetList=() =>axios.get(web+"/tweet");

const CreateNewPost=(TweetData:object) => API.post("/tweet/create",TweetData);
    

export {SingUpRequest,SingInRequest,GetUserTweetList,CreateNewPost};
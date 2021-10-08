import axios from 'axios';

import { TweetSchema, UserData } from '../Components/DataType/Feed';

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
const GetUsers=()=>axios.get(web+"/user/")
const GetAllGroups=()=>axios.get(web+"/group");
const GetUserTweetList=() =>axios.get(web+"/tweet");


const CreateNewPost=(TweetData:object) => API.post("/tweet/create",TweetData);
const UpdateTweet=(odd:object,newd:TweetSchema) => API.put("/tweet/update",{before:odd,after:newd})

const CrateGroup=(data:object)=>API.post("/group/create",data);
    


export {
    SingUpRequest,
    SingInRequest,
    GetUserTweetList,
    CreateNewPost,
    UpdateTweet,
    GetAllGroups,
    GetUserByName,
    CrateGroup,
    GetUsers
};
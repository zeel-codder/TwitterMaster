import axios from 'axios';

import { TweetSchema, UserData } from '../DataType/Feed';

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

const UpdateTweet=(odd:object,newd:TweetSchema) => API.put("/tweet/update",{
    before:odd,
    after:newd
})
    

// {

//     "before":{
//         "_id":"615c34a9394b4feb3f1f04d7",
//         "user_id":"613cb0fcab3911b09a59a56a",
//         "type":"remove like"
//     },
//     "after":{
//         "description":"zeel"
//     }
// }

export {SingUpRequest,SingInRequest,GetUserTweetList,CreateNewPost,UpdateTweet};
import axios from 'axios';

import { TweetSchema, UserData } from '../DataType/Feed';

const web=process.env.REACT_APP_WebSite;



const token:string=JSON.parse(localStorage.getItem('User') || "{}").token || "";
// console.log(`Bearer ${token}`);

const API = axios.create({
    baseURL:web,
    timeout: 10000000,
    headers: {'authorization': `Bearer ${token}`}
});

// console.log(API);

const SingUpRequest=(user:UserData) =>axios.post(web+"/user/create",user)
const SingInRequest=(user:UserData) =>axios.post(web+"/user/singin",user);
const GetUserByName=(name:string) =>axios.get(web+"/user/"+name);
const GetUsers=()=>axios.get(web+"/user/")
const GetAllGroups=()=>axios.get(web+"/group");
const GetUserTweetList=() =>axios.get(web+"/tweet");
const GetGroupsByIds=(list:string[])=>axios.post(web+"/tweet/tweetsbyid",{'ids':list})
const GetTweetOfUser=(name:string)=>axios.get(web+"/tweet/user/"+name);
const GetTweetId=(_id:string)=>axios.get(web+"/tweet/"+_id);
const UpDateUser=(name:string,after:object)=>axios.put(web+"/user/update",{before:{name},after});
const SendPassWordResetMail=(email:string)=>axios.post(web+"/email/password_reset",{email});


const UploadFile=(formData:FormData)=> axios.post("https://api.cloudinary.com/v1_1/dcgtilnwq/image/upload",formData);




const CreateNewPost=(TweetData:object) => API.post("/tweet/create",TweetData);
const UpdateTweet=(odd:object,newd:TweetSchema) => API.put("/tweet/update",{before:odd,after:newd})
const CrateGroup=(data:object)=>API.post("/group/create",data);
const ToggleFollowUser=(name:string,isAdd:boolean)=>API.post("/user/follow",{
    name,isAdd
})
const DeleteTweet=(_id:string)=>API.post("/tweet/delete",{_id});
const AddCommentApi=(_id:string,title:string)=>API.post("/tweet/add_comment",{_id,title});
const RemoveCommentApi=(_id:string,comment_id:string)=>API.post("/tweet/remove_comment",{_id,comment_id});


export {
    SingUpRequest,
    SingInRequest,
    GetUserTweetList,
    CreateNewPost,
    UpdateTweet,
    GetAllGroups,
    GetUserByName,
    CrateGroup,
    GetUsers,
    GetGroupsByIds,
    GetTweetOfUser,
    ToggleFollowUser,
    DeleteTweet,
    GetTweetId,
    AddCommentApi,
    RemoveCommentApi,
    UpDateUser,
    SendPassWordResetMail,
    UploadFile

};
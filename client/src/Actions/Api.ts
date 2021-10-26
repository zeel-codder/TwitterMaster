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
const SendPassWordResetMail=(email:string)=>axios.post(web+"/email/password_reset",{email});
const UploadFile=(formData:FormData)=> axios.post("https://api.cloudinary.com/v1_1/dcgtilnwq/image/upload",formData);


const GetUserByName=(name:string) =>API.get("/user/"+name);
const GetGroupsByIds=(name:string,number:number)=>API.post("/tweet/tweetsbyid",{name,number})
const GetTweetId=(_id:string)=>API.get("/tweet/"+_id);
const AllGroups=()=>API.get('/group/allgroups');
const UpDateUser=(name:string,after:object)=>API.put("/user/update",{before:{name},after});



const GetAllGroups=(length:number|undefined)=>API.get("/group/all/"+length);
const GetTweetOfUser=(name:string|undefined,length:number|undefined)=>API.get("/tweet/user/"+name+"/"+length);
const GetUserTweetList=(length:number|undefined) =>API.get("/tweet/all/"+length);
const GetUsers=(length:number|undefined)=>API.get("/user/all/"+length)



const GetGroupByName=(name:string|undefined)=>API.get("/group/"+name);
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
    UploadFile,
    AllGroups,
    GetGroupByName

};
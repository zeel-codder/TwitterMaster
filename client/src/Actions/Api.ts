import axios from 'axios';
import { TweetSchema, UserData } from '../DataType/Feed';


const web=process.env.REACT_APP_BE_URL;
const token:string=JSON.parse(localStorage.getItem('User') || "{}").token || "";
const API = axios.create({
    baseURL:web,
    timeout: 10000000,
    headers: {'authorization': `Bearer ${token}`}
});



// Auth Api Calls
const SingUpRequest=(user:UserData) =>axios.post(web+"/user/create",user)
const GetTokeInfo=(token:string) =>axios.post(web+"/user/token_info",{token:token})

const SingInRequest=(user:UserData) =>axios.post(web+"/user/singin",user);
const SendPassWordResetMail=(email:string)=>axios.post(web+"/email/password_reset",{email});






// For Get User Data Api Calls
const GetUserByName=(name:string) =>API.get("/user/"+name);
const UpDateUser=(name:string,after:object)=>API.put("/user/update",{before:{name},after});
const GetUsers=(length:number|undefined)=>API.get("/user/all/"+length)
const ToggleFollowUser=(name:string,isAdd:boolean)=>API.post("/user/follow",{
    name,isAdd
})


// Tweet CRUD And other Api Calls
const CreateNewPost=(TweetData:object) => API.post("/tweet/create",TweetData);
const GetUserTweetList=(length:number|undefined) =>API.get("/tweet/all/"+length);
const GetTweetOfUser=(name:string|undefined,length:number|undefined)=>API.get("/tweet/user/"+name+"/"+length);
const DeleteTweet=(_id:string)=>API.post("/tweet/delete",{_id});
const UpdateTweet=(odd:object,newd:TweetSchema) => API.put("/tweet/update",{before:odd,after:newd})
const AddCommentApi=(_id:string,title:string)=>API.post("/tweet/add_comment",{_id,title});
const GetGroupsByIds=(name:string,number:number)=>API.post("/tweet/tweetsbyid",{name,number})
const GetTweetId=(_id:string)=>API.get("/tweet/"+_id);
const RemoveCommentApi=(_id:string,comment_id:string)=>API.post("/tweet/remove_comment",{_id,comment_id});


// Group API Calls
const AllGroups=()=>API.get('/group/allgroups');
const GetAllGroups=(length:number|undefined)=>API.get("/group/all/"+length);
const GetGroupByName=(name:string|undefined)=>API.get("/group/"+name);
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
    AllGroups,
    GetGroupByName,
    GetTokeInfo

};

interface TweetSchema {
    creator:  string|undefined;
    image?:  {bit?:string,file?:File};
    video?:  {bit?:string,file?:File};
    description?:  string|undefined;
    like?:  string[];
    retweet?:  number;
    _id?: string;
    Creator_ID?:string|undefined;
    Creator_Name?:string|undefined;
    groups?:string;
    isImage:boolean;
    isVideo:boolean;
    url?:string
}


const NullTweet: TweetSchema = {
    description: '',
    image: {},
    video: {},
    creator: '',
    groups: '',
    isImage:false,
    isVideo:false,
    url:""
}


interface actionSchema extends TweetSchema{
    type:string;
}


const ChangeMessage: string = "ChangeTweetDescription";
const ChangeImg: string = "ChangeTweetImage";
const ChangeVideo: string = "ChangeTweetVideo";
const ChangeCreator: string = "ChangeTweetCreator";
const ChangeGroups: string = "ChangeTweetGroups";
const ChangeUrl:string="ChangeTweetUrl";


function TweetReducer(state = NullTweet, action: actionSchema) {
    // console.log(action,12)
    switch (action.type) {
        case ChangeMessage:
            return { ...state, description: action.description };
        case ChangeImg:
            return { ...state, image: action.image , isImage:action.isImage };
        case ChangeVideo:
            return { ...state, video: action.video , isVideo:action.isVideo };
        case ChangeCreator:
            return { ...state, creator: action.creator };
        case ChangeGroups:
            return { ...state, groups: action.groups };
        case ChangeUrl:
            return {...state,url:action.url};
        default:
            return state

    }
}


export { TweetReducer };
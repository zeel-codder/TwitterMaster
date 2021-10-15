


interface TweetSchema {
    creator:  string|undefined;
    image?:  string|undefined;
    video?:  string|undefined;
    description?:  string|undefined;
    like?:  string[];
    retweet?:  number;
    _id?: string;
    Creator_ID?:string|undefined;
    Creator_Name?:string|undefined;
    groups?:string;
}


interface UserData {
    type?: string|undefined;
    email?: string|undefined;
    password?: string|undefined;
    confirm_password?: string|undefined;
    name?: string|undefined;
    _id?:string|undefined;
}



interface HashTage {

    name: string|undefined;
    about?: string|undefined;
    img?: string|undefined;
}



interface GroupSchema {
    _id:string;
    title:string;
    description: string;
    users?:[string];
    tweets?:[string];
}

interface ExploreSchema {
    title: string;
    tweets?:String[];
    creator:String;
    _id?:String;
}


export type { TweetSchema, HashTage, GroupSchema, UserData,ExploreSchema };
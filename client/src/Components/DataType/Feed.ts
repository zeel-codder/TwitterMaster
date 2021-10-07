

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

    name: string|undefined;
    tagline: string|undefined;
    img?: string|undefined;
}


export type { TweetSchema, HashTage, GroupSchema, UserData };
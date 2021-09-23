

interface TweetSchema {
    creator:  string|undefined;
    img?:  string|undefined;
    video?:  string|undefined;
    message:  string|undefined;
    like?:  number|undefined;
    retweet?:  number|undefined;
}


interface UserData {
    type?: string|undefined;
    email: string|undefined;
    password?: string|undefined;
    confirm_password?: string|undefined;
    name: string|undefined;
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
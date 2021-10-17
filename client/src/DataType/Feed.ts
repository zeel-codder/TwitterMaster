interface TweetSchema {
    creator: string ;
    image?: string ;
    video?: string ;
    description?: string ;
    like?: string[];
    retweet?: number;
    _id?: string;
    Creator_ID?: string ;
    Creator_Name?: string ;
    groups?: string;
    comments:any[];
}


interface UserData {
    type?: string ;
    email?: string ;
    password?: string ;
    confirm_password?: string ;
    name?: string ;
    _id?: string ;
    followers?: string[];
    follow?: string[];
}



interface HashTage {

    name: string ;
    about?: string ;
    img?: string ;
}



interface GroupSchema {
    _id: string;
    title: string;
    description: string;
    users?: [string];
    tweets?: [string];
}

interface ExploreSchema {
    title: string;
    tweets?: String[];
    creator: String;
    _id?: String;
}


export type { TweetSchema, HashTage, GroupSchema, UserData, ExploreSchema };
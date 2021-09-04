

interface TweetSchema{
    creator:undefined|string;
    img?:undefined|string ;
    video?:undefined|string ;
    message:undefined|string;
    like?:undefined|number;
    retweet?:undefined|number;
}






interface HashTage{

    name:undefined | string;
    about?:undefined | string;
    img?:undefined | string;
}



interface GroupSchema{

    name:undefined | string;
    tagline:undefined | string;
    img?:undefined | string;
}


export type {TweetSchema,HashTage,GroupSchema};

interface Basic{
    title: string;
    description: string;
    image?: string;
    video?: string;
}

interface User {
    name: string;
    email: string;
    image?: string;
    password: string;
    follow?:string[];
    followers?:string[];
}

interface Tweet extends Basic{
    like?: string[];
    retweet?: number;
    explore?: string[];
    Creator_Name?:string|any;
    Creator_ID?:string|any;
    groups?:string;

}

interface Explore extends Basic{
    tweets?:String[];
    creator:String;
}

interface Group  extends Basic{
    users?: String[];
    tweets?: String[];

}

export {User,Tweet,Explore,Group};
  
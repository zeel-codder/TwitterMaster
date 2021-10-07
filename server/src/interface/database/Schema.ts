
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
    like?: String[];
    retweet?: number;
    explore?: String[];
    Creator_Name?:String|any;
    Creator_ID?:String|any;

}

interface Explore extends Basic{
    tweets?:String[];
    creator:String;
}

interface Group  extends Basic{
    admin?: String[];
    users?: String[];
}

export {User,Tweet,Explore,Group};
  
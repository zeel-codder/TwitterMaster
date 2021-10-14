

interface HomeSchema{

    type?:string;
    isMe?:boolean;

}



interface GroupCSchema{
    type?: string;
    isMe?:boolean;
}


interface ProfileSchema{

}

interface LoginData {

    IsSignUp: undefined | boolean | string;
    IsDisplay?: boolean | undefined;

}





export type {HomeSchema,LoginData,ProfileSchema,GroupCSchema};
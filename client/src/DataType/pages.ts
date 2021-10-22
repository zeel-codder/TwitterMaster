interface HomeSchema{

    type?:string;
    isMe?:boolean;
    name?:string;

}
interface GroupCSchema{
    type?: string;
    isMe?:boolean;
}



interface LoginData {

    IsSignUp: undefined | boolean | string;
    IsDisplay?: boolean | undefined;

}





export type {HomeSchema,LoginData,GroupCSchema};
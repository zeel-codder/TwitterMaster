interface ExploreSchema{

}


interface HomeSchema{

    type?:string;

}



interface GroupCSchema{
    type?: string;
}


interface ProfileSchema{

}

interface LoginData {

    IsSignUp: undefined | boolean | string;
    IsDisplay?: boolean | undefined;

}








export type {ExploreSchema,HomeSchema,LoginData,ProfileSchema,GroupCSchema};
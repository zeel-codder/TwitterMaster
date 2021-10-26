function GetNewUser(Tweet:any,name:Record<string, any> | undefined){

    const data=Tweet._doc;

    return {
        _id:data._id,
        name:data.name,
        createdAt:data.createdAt,
        isFollow: data.followers?.includes(name),
    }

}


function GetUserData(Tweet:any,name:Record<string, any> | undefined){

    const data=Tweet._doc;



    return {

        ...data,
        password:''

    
    }

}

function GetNewUserList(List:any,name:Record<string, any> | undefined){
    return List.map((dataItem: any) => {
        return GetNewUser(dataItem,name);
    });
}

export {GetNewUser,GetNewUserList,GetUserData}
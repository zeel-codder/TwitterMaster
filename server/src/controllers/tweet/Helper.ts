function GetNewTweet(Tweet:any,name:Record<string, any> | undefined){

    const data=Tweet._doc;



    return {

        ...data,
        isLike: data.like?.includes(name),
        like: data.like?.length || 0,
        comments: data.comments?.slice(0, 2),
    }

}


function GetTweetData(Tweet:any,name:Record<string, any> | undefined){

    const data=Tweet._doc;



    return {

        ...data,
        isLike: data.like?.includes(name),
        like: data.like?.length || 0,
    
    }

}

function GetNewTweetList(List:any,name:Record<string, any> | undefined){
    return List.map((dataItem: any) => {
        return GetNewTweet(dataItem,name);
    });
}

export {GetNewTweet,GetNewTweetList,GetTweetData}
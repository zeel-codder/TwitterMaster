import {TweetSchema,GroupSchema,UserData} from '../DataType/Feed'


interface action  {
    type:  string |undefined;
    data: TweetSchema[] |GroupSchema[] | UserData[];
}

interface data{
    Tweets:TweetSchema[],
    Groups:GroupSchema[],
    Users:UserData[],
}

const initialState: data= {
    Tweets:[],
    Groups:[],
    Users:[]
    
}



function DataReducer(state = initialState, action:action) {
    // console.log(action,"1")
    switch (action.type) {
        case "AddTweets":
            return { ...state, Tweets:action.data };
        case "AddGroups":
            return { ...state, Groups:action.data };
        case "AddUsers":
            return { ...state, Users:action.data };
      
        default:
            return state;
    }
}

export {DataReducer};
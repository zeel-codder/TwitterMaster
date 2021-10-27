/**
 * This Reducer is Used For show the any user profile page. used to store user data
 * and number tweets made by the user.
 */

import {UserData,TweetSchema} from '../DataType/Feed';


interface DataSchema{
    user:UserData|null,
    tweets:TweetSchema[],
}

interface actionSchema extends TweetSchema{
    type:string;
    data:UserData|TweetSchema[];
}

const initialState: DataSchema= {
    user:null,
    tweets:[]
}


function ProfileReducer(state = initialState, action:actionSchema) {
    // console.log(action,"1")
    switch (action.type) {
        case "Profile_AddTweets":
            return { ...state, tweets:action.data };
        case "Profile_AddUser":
            return { ...state, user:action.data };
        default:
            return state;
    }
}

export {ProfileReducer};




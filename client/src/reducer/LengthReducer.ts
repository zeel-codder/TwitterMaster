interface Data {
    TweetLength: number;
    GroupLength: number;
    UserLength: number;
}


interface action {

    type: string;
    data?: number;

}

/**This Reducer is Used to In infinite scrolling of tweet , group and User data. */

const initialState: Data = {
    TweetLength: 10,
    GroupLength: 10,
    UserLength: 10,
}



function LengthReducer(state = initialState, action: action) {
    // console.log(action)
    switch (action.type) {
        case "Length_ChangeTweetLength":
            return { ...state, TweetLength: action.data }
        case "Length_ChangeGroupLength":
            return { ...state, GroupLength: action.data }
        case "Length_ChangeUserLength":
            return { ...state, UserLength: action.data}
        default:
            return state;
    }
}

export { LengthReducer };
/**GroupCreateReducer is User in Group Create form in App */

interface action {
    type: string;
    data: string;
}

interface data {
    title: string;
    description?: string;
}

//init
const initialState: data = {
    title: "",
    description: ""
}



function GroupCreateReducer(state = initialState, action: action) {
    switch (action.type) {
        case "ChangeTitle":
            return { ...state, title: action.data };
        case "ChangeDescription":
            return { ...state, description: action.data };
        default:
            return state;
    }
}

export { GroupCreateReducer };
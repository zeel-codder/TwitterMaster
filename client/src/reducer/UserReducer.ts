import {UserData} from '../Components/DataType/Feed'


interface action  {
    type:  string |undefined;
    data: UserData;
}

const initialState: UserData = {
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    _id:"",
}



function UserReducer(state = initialState, action:action) {
    switch (action.type) {
        case "AddUser":
            return { ...state, ...action.data };
        default:
            return initialState;
    }
}

export {UserReducer};
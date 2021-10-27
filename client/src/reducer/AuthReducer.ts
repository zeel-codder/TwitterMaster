/* 
Reducer is User in Login/Sing Up page also use to store the user data
*/


interface UserData {
    type?: string|undefined;
    email: string|undefined;
    password?: string|undefined;
    confirm_password?: string|undefined;
    name: string|undefined;
}

interface action {
    type:  string |undefined;
    email?:  string |undefined;
    password?: string |undefined;
    confirm_password?:  string |undefined;
    name?: string |undefined;
}


const ChangeEmail: string = "ChangeEmail";
const ChangePassword: string = "ChangePassword";
const ChangeCPassword: string = "ChangeCPassword";
const ChangeName: string = "ChangeName";


//init
const initialState: UserData = {
    email: "",
    password: "",
    confirm_password: "",
    name: ""
}



function AuthReducer(state = initialState, action:action) {
    switch (action.type) {
        case ChangeEmail:
            return { ...state, email: action.email };
        case ChangeName:
            return { ...state,name: action.name };
        case ChangePassword:
            return { ...state, password: action.password };
        case ChangeCPassword:
            return { ...state, confirm_password: action.confirm_password };
        default:
            return state;
    }
}

export {AuthReducer};
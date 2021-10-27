/**
 * MELReducer is User for show message on screen some time, also it used in showing
 * loader in App. The End State is User in Infinite Scrolling part.
 */
interface action  {
    type: string;
    data: string;
}

interface data {

    message:string;
    end: boolean;
    load:boolean;
   
}

const initialState: data= {
    message:"",
    end:false,
    load:false
}



function MELReducer(state = initialState, action:action) {
    switch (action.type) {
        case "ChangeMessage":
            return { ...state, message:action.data };
        case "ChangeLoad":
            return { ...state, load: action.data };
        case "ChangeEnd":
            return {...state,end:action.data};
        default:
            return state;
    }
}

export {MELReducer};
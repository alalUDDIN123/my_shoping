

import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILUE,
    LOGIN_REQUEST_SUCESS,
    SIGNUP_REQUEST,
    SIGNUP_REQUEST_FAILUE,
    SIGNUP_REQUEST_SUCESS
} from "../../Constant/actionTypes";
import { loginInitial, signupInitial } from "../../objects/Objects";


const signupReducer = (state = signupInitial, { type, payload }) => {
    switch (type) {

        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true

            }

        case SIGNUP_REQUEST_SUCESS:
            // console.log("payload:-",payload);
            localStorage.setItem("registration",JSON.stringify(payload))
            return {
                ...state,
                data: payload,
                isLoading: false
            }

        case SIGNUP_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const loginReducer = (state = loginInitial, { type, payload }) => {
    switch (type) {
     
    case LOGIN_REQUEST:
        return{
            ...state,
            isLoading:true
        }  
    
    case LOGIN_REQUEST_SUCESS:
        localStorage.setItem("loggedUser",JSON.stringify(payload))
        return{
            ...state,
            isAuth:true,
            isLoading:false
        }  
        
    case LOGIN_REQUEST_FAILUE:
        return{
            ...state,
            isAuth:false,
            isLoading:false,
            isError:true

        }    
        default: return state
    }
}

export {
    signupReducer,
    loginReducer
}
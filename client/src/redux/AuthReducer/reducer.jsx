

import {
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_REQUEST_FAILUE,
    FORGET_PASSWORD_REQUEST_SUCESS,

    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILUE,
    LOGIN_REQUEST_SUCESS,

    RESET_PASSWORD_REQUEST,

    RESET_PASSWORD_REQUEST_FAILUE,

    RESET_PASSWORD_REQUEST_SUCESS,

    SIGNUP_REQUEST,
    SIGNUP_REQUEST_FAILUE,
    SIGNUP_REQUEST_SUCESS,

    
} from "../../Constant/actionTypes";

import {
    forgetPasswordInitial,
    loginInitial,
    resetPasswordIntial,
    signupInitial,
} from "../../objects/Objects";


const signupReducer = (state = signupInitial, { type, payload }) => {
    switch (type) {

        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true

            }

        case SIGNUP_REQUEST_SUCESS:
            // console.log("payload:-",payload);
            localStorage.setItem("registration", JSON.stringify(payload))
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
            return {
                ...state,
                isLoading: true
            }

        case LOGIN_REQUEST_SUCESS:
            localStorage.setItem("loggedUser", JSON.stringify(payload))
            return {
                ...state,
                isAuth: true,
                isLoading: false
            }

        case LOGIN_REQUEST_FAILUE:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                isError: true

            }
        default: return state
    }
}

const forgetPasswordReducer = (state = forgetPasswordInitial,{type,payload})=>{

    switch(type){
    
      case FORGET_PASSWORD_REQUEST:
        return{
            ...state,
            isLoading:true
        }   
      
      case FORGET_PASSWORD_REQUEST_SUCESS:
        return{
            ...state,
            response:payload,
            isLoading:false
        }  
      
      case FORGET_PASSWORD_REQUEST_FAILUE:
        return{
            ...state,
            isError:true,
            isLoading:false
        }  
        default:return state
    }
}

const resetPasswordReducer = (state = resetPasswordIntial,{type,payload})=>{

    switch(type){
    
      case RESET_PASSWORD_REQUEST:
        return{
            ...state,
            isLoading:true
        }   
      
      case RESET_PASSWORD_REQUEST_SUCESS:
        return{
            ...state,
            response:payload,
            isLoading:false
        }  
      
      case RESET_PASSWORD_REQUEST_FAILUE:
        return{
            ...state,
            isError:true,
            isLoading:false
        }  
        default:return state
    }
}


export {
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer
}
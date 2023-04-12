

import {
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
        default: return state
    }
}

export {
    signupReducer,
    loginReducer
}
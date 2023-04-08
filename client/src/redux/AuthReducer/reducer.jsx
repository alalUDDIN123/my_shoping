

import { loginInitial, signupInitial } from "../../objects/Objects";


const signupReducer = (state = signupInitial, { type, payload }) => {
    switch (type) {
        default: return state
    }
}


const loginReducer = (state = loginInitial, { type, payload }) => {
    switch (type) {
        default: return state
    }
}

export{
    signupReducer,
    loginReducer
}
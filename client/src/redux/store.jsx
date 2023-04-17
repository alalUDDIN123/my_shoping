import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import {
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer
} from "./AuthReducer/reducer";

import {
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer,
    addToCartReducer
} from "./AppReducer/reducer";


const combineReducer = combineReducers({
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer,
    addToCartReducer
})
export const store = legacy_createStore(combineReducer, applyMiddleware(thunk))

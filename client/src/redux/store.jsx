import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { signupReducer, loginReducer } from "./AuthReducer/reducer";
import {
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer
} from "./AppReducer/reducer";
const combineReducer = combineReducers({
    signupReducer,
    loginReducer,
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer
})
export const store = legacy_createStore(combineReducer, applyMiddleware(thunk))

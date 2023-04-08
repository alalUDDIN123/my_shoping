import { combineReducers, legacy_createStore } from "redux";

import { signupReducer, loginReducer } from "./AuthReducer/reducer";
const combineReducer = combineReducers({
    signupReducer,
    loginReducer
})
export const store = legacy_createStore(combineReducer)

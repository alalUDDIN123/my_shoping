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
    addReviwReducer

} from "./AppReducer/products/reducer";


import {
    addToCartReducer,
    getCartDataReducer,
    RemoveSingleCartReducer,
    RemoveAllCartReducer,
} from "./AppReducer/cart/reducer";

import {
    deliveryAddressReducer,
    AddressReducer,
    addOrderReducer
} from "./AppReducer/checkoutAndOder/reducer";

const combineReducer = combineReducers({
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer,
    addToCartReducer,
    getCartDataReducer,
    RemoveSingleCartReducer,
    RemoveAllCartReducer,
    deliveryAddressReducer,
    AddressReducer,
    addOrderReducer
})
export const store = legacy_createStore(combineReducer, applyMiddleware(thunk))

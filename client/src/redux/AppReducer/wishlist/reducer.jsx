
import {
    ADD_WISHLIST_REQUEST,
    ADD_WISHLIST_REQUEST_FAILUE,
    ADD_WISHLIST_REQUEST_SUCESS,

    GET_WISHLIST_REQUEST,
    GET_WISHLIST_REQUEST_FAILUE,
    GET_WISHLIST_REQUEST_SUCESS,

    REMOVE_WISHLIST_REQUEST,
    REMOVE_WISHLIST_REQUEST_FAILUE,
    REMOVE_WISHLIST_REQUEST_SUCESS,

} from "../../../Constant/actionTypes";

import {
    addWishlistInitial, 
    getWishlistInitial,
    removeWishListInitial,
} from "../../../objects/Objects";


const addWishListReducer = (state = addWishlistInitial, { type, payload }) => {
    switch (type) {

        case ADD_WISHLIST_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ADD_WISHLIST_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false,
                isError: null

            }
        case ADD_WISHLIST_REQUEST_FAILUE:
            return {
                ...state,
                isError: payload,
                isLoading: false
            }
        default: return state
    }
}

const getWishListReducer = (state = getWishlistInitial, { type, payload }) => {
    switch (type) {

        case GET_WISHLIST_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_WISHLIST_REQUEST_SUCESS:
            return {
                ...state,
                data: payload,
                isLoading: false,
                isError: null

            }
        case GET_WISHLIST_REQUEST_FAILUE:
            return {
                ...state,
                isError: payload,
                isLoading: false
            }
        default: return state
    }
}

const removeWishListReducer = (state = removeWishListInitial, { type, payload }) => {
    switch (type) {

        case REMOVE_WISHLIST_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_WISHLIST_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false,
                isError: null

            }
        case REMOVE_WISHLIST_REQUEST_FAILUE:
            return {
                ...state,
                isError: payload,
                isLoading: false
            }
        default: return state
    }
}

export {
    addWishListReducer,
    getWishListReducer,
    removeWishListReducer
}
import {
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_REQUEST_FAILUE,
    ADD_REVIEW_REQUEST_SUCESS,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_REQUEST_FAILUE,
    GET_PRODUCT_DETAILS_REQUEST_SUCESS,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST_FAILUE,
    GET_PRODUCT_REQUEST_SUCESS,

} from "../../Constant/actionTypes";
import {
    addReviewInitial,
    getProductDetailsInitial,
    getProductIntial
} from "../../objects/Objects";


const getProductReducer = (state = getProductIntial, { type, payload }) => {
    switch (type) {

        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCT_REQUEST_SUCESS:
            return {
                ...state,
                products: payload,
                isLoading: false

            }
        case GET_PRODUCT_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const getProductDetailsReducer = (state = getProductDetailsInitial, { type, payload }) => {
    switch (type) {

        case GET_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCT_DETAILS_REQUEST_SUCESS:
            return {
                ...state,
                product: payload,
                isLoading: false

            }
        case GET_PRODUCT_DETAILS_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}

const addReviwReducer = (state = addReviewInitial, { type, payload }) => {
    switch (type) {

        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ADD_REVIEW_REQUEST_SUCESS:
            return {
                ...state,
                addReview: payload,
                isLoading: false

            }
        case ADD_REVIEW_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


export {
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer
}
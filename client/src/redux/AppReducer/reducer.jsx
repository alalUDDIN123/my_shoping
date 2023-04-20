import {
    ADD_CART_REQUEST,
    ADD_CART_REQUEST_FAILUE,
    ADD_CART_REQUEST_SUCESS,

    ADD_DELIVERY_ADDRESS_FAILURE,
    ADD_DELIVERY_ADDRESS_REQUEST,
    ADD_DELIVERY_ADDRESS_SUCESS,

    ADD_REVIEW_REQUEST,
    ADD_REVIEW_REQUEST_FAILUE,
    ADD_REVIEW_REQUEST_SUCESS,

    GET_CART_REQUEST,
    GET_CART_REQUEST_FAILUE,
    GET_CART_REQUEST_SUCESS,

    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_REQUEST_FAILUE,
    GET_PRODUCT_DETAILS_REQUEST_SUCESS,
    
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST_FAILUE,
    GET_PRODUCT_REQUEST_SUCESS,

    REMOVE_ALL_CART_REQUEST,
    REMOVE_ALL_CART_REQUEST_FAILUE,
    REMOVE_ALL_CART_REQUEST_SUCESS,

    REMOVE_SINGLE_CART_REQUEST,
    REMOVE_SINGLE_CART_REQUEST_FAILUE,
    REMOVE_SINGLE_CART_REQUEST_SUCESS,

} from "../../Constant/actionTypes";
import {
    AddtoCartIntial,
    DeliveryAddressIntial,
    addReviewInitial,
    getCartDataIntial,
    getProductDetailsInitial,
    getProductIntial,
    removeAllCart,
    removeSingleCart
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


const addToCartReducer = (state = AddtoCartIntial, { type, payload }) => {
    switch (type) {

        case ADD_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ADD_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case ADD_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const getCartDataReducer = (state = getCartDataIntial, { type, payload }) => {
    switch (type) {

        case GET_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case GET_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const RemoveSingleCartReducer = (state = removeSingleCart, { type, payload }) => {
    switch (type) {

        case REMOVE_SINGLE_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_SINGLE_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case REMOVE_SINGLE_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const RemoveAllCartReducer = (state = removeAllCart, { type, payload }) => {
    switch (type) {

        case REMOVE_ALL_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_ALL_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case REMOVE_ALL_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const deliveryAddressReducer=(state=DeliveryAddressIntial,{type,payload})=>{

    switch(type){

    case ADD_DELIVERY_ADDRESS_REQUEST:
        return{
            ...state,
            isLoading:true
        }

    case ADD_DELIVERY_ADDRESS_SUCESS:
        return{
            ...state,
            response:payload,
            isLoading:false
        } 
    
    case ADD_DELIVERY_ADDRESS_FAILURE:
        return{
            ...state,
            isError:true,
            isLoading:false
        }    
        default:return state;
    }
}


export {
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer,
    addToCartReducer,
    getCartDataReducer,
    RemoveSingleCartReducer,
    RemoveAllCartReducer,
    deliveryAddressReducer

}
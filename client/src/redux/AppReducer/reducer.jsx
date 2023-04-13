import {
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST_FAILUE,
    GET_PRODUCT_REQUEST_SUCESS,

} from "../../Constant/actionTypes";
import { getProductIntial } from "../../objects/Objects";


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
        default:return state    
    }
}

export{
    getProductReducer
}
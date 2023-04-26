import {
    ADD_WISHLIST_REQUEST,
    ADD_WISHLIST_REQUEST_FAILUE,
    ADD_WISHLIST_REQUEST_SUCESS,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_REQUEST_FAILUE,
    GET_WISHLIST_REQUEST_SUCESS,

} from "../../../Constant/actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddWishListAction = (payload) => async (dispatch) => {
    dispatch({ type: ADD_WISHLIST_REQUEST });
    let responseData = null;

    try {
        const res = await fetch(`${BASE_URL}/api/wishlist/add`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                token: payload.token
            },
        });

        responseData = await res.json();

        if (res.ok) {
            dispatch({ type: ADD_WISHLIST_REQUEST_SUCESS, payload: responseData.msg });
        } else {
            dispatch({
                type: ADD_WISHLIST_REQUEST_FAILUE,
                payload: responseData && responseData.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_WISHLIST_REQUEST_FAILUE,
            payload: responseData ? responseData.msg : error.message,
        });
    }
};


const GetWishListAction = (payload) => async (dispatch) => {
    dispatch({ type: GET_WISHLIST_REQUEST });
    let responseData = null;
    // console.log("token::-", payload.token);
    try {
        const res = await fetch(`${BASE_URL}/api/wishlist/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: payload.token
            },
        });

        responseData = await res.json();
        // console.log("responseData:-", responseData);

        if (res.ok) {
            dispatch({ type: GET_WISHLIST_REQUEST_SUCESS, payload: responseData.wishlist});
        } else {
            dispatch({
                type: GET_WISHLIST_REQUEST_FAILUE,
                payload: responseData && responseData.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_REQUEST_FAILUE,
            payload: responseData ? responseData.msg : error.message,
        });
    }
};

export {
    AddWishListAction,
    GetWishListAction
}
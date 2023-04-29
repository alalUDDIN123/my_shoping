import {
    

    // CANCEL_ORDER_REQUEST,
    // CANCEL_ORDER_REQUEST_FAILUE,
    // CANCEL_ORDER_REQUEST_SUCCESS,

    GET_ORDERS_REQUEST,
    GET_ORDERS_REQUEST_SUCCESS,
    GET_ORDERS_REQUEST_FAILUE,
    
    ADD_ORDER_REQUEST,
    ADD_ORDER_REQUEST_SUCCESS,
    ADD_ORDER_REQUEST_FAILUE,
  
    
  } from "../../../Constant/actionTypes";

import getLoggedUserData from "../../../utils/LoggedUserData";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LoggedUser = getLoggedUserData()

const AddOrderAction = (payload) => async (dispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    try {
        let res = await fetch(`${BASE_URL}/api/order/post`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                token: payload.token ?? LoggedUser.token ?? "",
            },
        });

        const response = await res.json();

        if (response && response.hint === "orSucc") {
            dispatch({
                type: ADD_ORDER_REQUEST_SUCCESS,
                payload: response,
            });
        }

        return response;
    } catch (error) {
        dispatch({
            type: ADD_ORDER_REQUEST_FAILUE,
        });
    }
};

const GetOrderAction = (payload) => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
        let res = await fetch(`${BASE_URL}/api/order/get`, {
            headers: {
                "Content-Type": "application/json",
                token: payload.token ?? LoggedUser.token ?? "",
            },
        });

        const response = await res.json();

        // console.log("action response:-",response[0]);

        if (response && response[0]._id) {
            dispatch({
                type: GET_ORDERS_REQUEST_SUCCESS,
                payload: response,
            });
        }

        return response;
    } catch (error) {
        dispatch({
            type: GET_ORDERS_REQUEST_FAILUE,
        });
    }
};


export{
    AddOrderAction,
    GetOrderAction
}
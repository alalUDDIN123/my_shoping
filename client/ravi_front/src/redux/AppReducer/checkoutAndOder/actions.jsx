import {
  ADD_DELIVERY_ADDRESS_FAILURE,
  ADD_DELIVERY_ADDRESS_REQUEST,
  ADD_DELIVERY_ADDRESS_SUCESS,

  ADD_ORDER_REQUEST,
  ADD_ORDER_REQUEST_FAILUE,
  ADD_ORDER_REQUEST_SUCESS,

} from "../../../Constant/actionTypes";

import getLoggedUserData from "../../../utils/LoggedUserData";

// getting data from local storage
const LoggedUser = getLoggedUserData();




const deliveryAddressActionObj = (payload) => async (dispatch) => {
  dispatch({ type: ADD_DELIVERY_ADDRESS_REQUEST });
  try {
    let res = await fetch("http://localhost:8080/api/address", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: payload.token ?? LoggedUser.token ?? "",
      },
    });

    const response = await res.json();

    if (response && response.hint === "deSuces") {
      dispatch({
        type: ADD_DELIVERY_ADDRESS_SUCESS,
        payload: response,
      });
    }

    return response;
  } catch (error) {
    dispatch({
      type: ADD_DELIVERY_ADDRESS_FAILURE,
    });
  }
};

const storeAddressAction = (payload) => {
  return {
    type: "DELIVERY_ADDRESS",
    payload,
  };
};

const AddOrderAction = (payload) => async (dispatch) => {
  dispatch({ type: ADD_ORDER_REQUEST });
  try {
    let res = await fetch("http://localhost:8080/api/order/post", {
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
        type: ADD_ORDER_REQUEST_SUCESS,
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

export {

  deliveryAddressActionObj,
  storeAddressAction,
  AddOrderAction,
};

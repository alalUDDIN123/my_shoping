import {


  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_REQUEST_FAILUE,
  CANCEL_ORDER_REQUEST_SUCCESS,

  GET_ORDERS_REQUEST,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST_FAILUE,

  ADD_ORDER_REQUEST,
  ADD_ORDER_REQUEST_SUCCESS,
  ADD_ORDER_REQUEST_FAILUE,


} from "../../../Constant/actionTypes";

const orderInitial = {
  isLoading: false,
  isError: "",
  orders: [],
  deliveryAddress: {},
  payMethod: "",
  status: ""
};

const OrdersReducer = (state = orderInitial, { type, payload }) => {
  switch (type) {
    case ADD_ORDER_REQUEST:
    case GET_ORDERS_REQUEST:
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: ""
      };
    case ADD_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [...state.orders, payload],
        deliveryAddress: {}
      };
    case GET_ORDERS_REQUEST_SUCCESS:
      // console.log("payload data from action", payload);
      const pay = [];
      const sta = [];

      const orders = [];
      const deliveryAddresses = [];

      payload.forEach((item) => {
        // console.log("mapping item",item);
        pay.push(item.paymentMethod)
        sta.push(item.orderStatus)
        orders.push(...item.products);
        deliveryAddresses.push(item.deliveryAddress);
      });

      return {
        ...state,
        isLoading: false,
        orders,
        deliveryAddress: deliveryAddresses,
        payMethod: pay,
        status: sta,
        isError: ""
      };

    case CANCEL_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map(order =>
          order._id === payload ? { ...order, status: "Cancelled" } : order
        ),
        isError: ""
      };
    case ADD_ORDER_REQUEST_FAILUE:
    case GET_ORDERS_REQUEST_FAILUE:
    case CANCEL_ORDER_REQUEST_FAILUE:
      return {
        ...state,
        isLoading: false,
        isError: payload
      };
    default:
      return state;
  }
};



export default OrdersReducer
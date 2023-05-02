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

  GET_SINGLE_ORDER_REQUEST,
  GET_SINGLE_ORDER_REQUEST_SUCCESS,
  GET_SINGLE_ORDER_REQUEST_FAILUE,


} from "../../../Constant/actionTypes";

const orderInitial = {
  isLoading: false,
  isError: "",
  orders: [],
  deliveryAddress: {},
  payMethod: "",
  status: ""
};

const getSingleOrderInitial = {
  isLoading: false,
  isError: "",
  order: [],
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

      // console.log("payload data from action for all products", payload);
      const pay = [];
      const sta = [];
      const orderId=[]

      const orders = [];
      const deliveryAddresses = [];

      payload.forEach((item) => {
        // console.log("mapping item",item);
        pay.push(item.paymentMethod)
        sta.push(item.orderStatus)
        orders.push(...item.products);
        orderId.push(item._id)
        deliveryAddresses.push(item.deliveryAddress);
      });

      // console.log("orderId:-",orderId);
      return {
        ...state,
        isLoading: false,
        orders,
        deliveryAddress: deliveryAddresses,
        payMethod: pay,
        orderId,
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


const GetSingleOrderReducer = (state = getSingleOrderInitial, { type, payload }) => {
  switch (type) {

    case GET_SINGLE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: ""
      }

    case GET_SINGLE_ORDER_REQUEST_SUCCESS:
      console.log("payload from action for single order in reducer:",payload);
      return {
        ...state,
        isLoading: false,
        isError: "",
        order:payload.products[0].productId,
        deliveryAddress:payload.deliveryAddress,
        payMethod:payload.paymentMethod,
        status:payload.orderStatus
      }

    case GET_SINGLE_ORDER_REQUEST_FAILUE:
      return {
        ...state,
        isLoading: false,
        isError: payload
      }
    default: return state;
  }
}


export {
  OrdersReducer,
  GetSingleOrderReducer
}
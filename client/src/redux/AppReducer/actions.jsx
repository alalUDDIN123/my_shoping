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

  ADD_CART_REQUEST,
  ADD_CART_REQUEST_FAILUE,
  ADD_CART_REQUEST_SUCESS,

  GET_CART_REQUEST,
  GET_CART_REQUEST_SUCESS,
  GET_CART_REQUEST_FAILUE,

  REMOVE_SINGLE_CART_REQUEST_SUCESS,
  REMOVE_SINGLE_CART_REQUEST,
  REMOVE_SINGLE_CART_REQUEST_FAILUE,

  REMOVE_ALL_CART_REQUEST,
  REMOVE_ALL_CART_REQUEST_SUCESS,
  REMOVE_ALL_CART_REQUEST_FAILUE,

  INCREMENT_CART_QUANTYTI_REQUEST,
  INCREMENT_CART_QUANTYTI_REQUEST_SUCESS,
  INCREMENT_CART_QUANTYTI_REQUEST_FAILUE,
  
  DECREMENT_CART_QUANTYTI_REQUEST,
  DECREMENT_CART_QUANTYTI_REQUEST_SUCESS,
  DECREMENT_CART_QUANTYTI_REQUEST_FAILUE,

} from "../../Constant/actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log(BASE_URL, "---------this is base url");

const getData = (params = {}) => {
  return async (dispatch) => {
    // console.log("params from action:-", params);

    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
      let url = `${BASE_URL}/api/products/get`;

      if (params.page) {
        url += `page=${params.page}&`;
      }
      if (params.limit) {
        url += `limit=${params.limit}&`;
      }
      if (
        params.category &&
        params.category !== "" &&
        params.category !== null
      ) {
        url += `category=${params.category}&`;
      }
      if (params.query && params.query !== "" && params.query !== null) {
        url += `query=${params.query}&`;
      }

      let arrayBrand = [];
      if (params.brands && params.brands !== "" && params.brands !== null) {
        let brands = params.brands.split(",");
        for (let i = 0; i < brands.length; i++) {
          arrayBrand.push(brands[i]);
        }
      }

      if (arrayBrand.length > 0) {
        let brandParam = "brand=";
        for (let i = 0; i < arrayBrand.length; i++) {
          brandParam += arrayBrand[i];
          if (i < arrayBrand.length - 1) {
            brandParam += "&brand=";
          }
        }
        url += `${brandParam}&`;
      }

      if (
        params.minPrice &&
        params.minPrice !== "" &&
        params.minPrice !== null &&
        params.minPrice !== 0
      ) {
        url += `minPrice=${params.minPrice}&`;
      }
      if (
        params.maxPrice &&
        params.maxPrice !== "" &&
        params.maxPrice !== null &&
        params.maxPrice !== 0
      ) {
        url += `maxPrice=${params.maxPrice}&`;
      }

      if (params.sort && params.sort !== "" && params.sort !== null) {
        url += `_sort=${params.sort}&`;
      }

      if (params.order && params.order !== "" && params.order !== null) {
        url += `_order=${params.order}&`;
      }

      if (
        params.ratings &&
        params.ratings !== "" &&
        params.ratings !== null &&
        params.ratings !== 0
      ) {
        url += `ratings=${params.ratings}&`;
      }

      // console.log(url, "this is get data url");

      let res = await fetch(url);
      let data = await res.json();
      // console.log("data::-", data);
      dispatch({ type: GET_PRODUCT_REQUEST_SUCESS, payload: data.products });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_REQUEST_FAILUE });
    }
  };
};

const getProductDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    try {
      let res = await fetch(`${BASE_URL}/api/products/get/${id}`);
      let data = await res.json();
      // console.log(data);
      dispatch({
        type: GET_PRODUCT_DETAILS_REQUEST_SUCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_DETAILS_REQUEST_FAILUE });
    }
  };
};

const addReviewAction = (payload) => async (dispatch) => {
  dispatch({ type: ADD_REVIEW_REQUEST });
  // console.log("payload::-",payload);
  try {
    let res = await fetch(`${BASE_URL}/api/products/review`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: payload.token,
      },
    });

    let response = await res.json();
    // console.log("revuiwes add response::-", response);

    if (response && response.message === "Review Added") {
      dispatch({ type: ADD_REVIEW_REQUEST_SUCESS, payload: response.message });
    }

    return response;
  } catch (error) {
    dispatch({ type: ADD_REVIEW_REQUEST_FAILUE });
  }
};



const addToCartAction = (payload) => async (dispatch) => {
  dispatch({ type: ADD_CART_REQUEST });
  // console.log("payload::-",payload);
  try {
    let res = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: payload.token,
      },
    });

    let response = await res.json();
    // console.log("revuiwes add response::-", response);

    if (response && response.msg === "product added to cart successs") {
      dispatch({ type: ADD_CART_REQUEST_SUCESS, payload: response.msg });
    }

    return response;
  } catch (error) {
    dispatch({ type: ADD_CART_REQUEST_FAILUE });
  }
};


const getCartData = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });

    try {
      let res = await fetch(`${BASE_URL}/api/cart/get`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          token: token
        }
      });
      let data = await res.json();
      // console.log(data);
      dispatch({
        type: GET_CART_REQUEST_SUCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: GET_CART_REQUEST_FAILUE });
    }
  };
};

const removerSingleCartAction = (payload) => {
  return async (dispatch) => {
    // console.log("payload::-", payload.productId);
    dispatch({
      type: REMOVE_SINGLE_CART_REQUEST
    })
    try {
      let res = await fetch(`http://localhost:8080/api/cart/remove`, {
        method: "DELETE",
        body: JSON.stringify({productId: payload.productId}),
        headers: {
          'Content-Type': "application/json",
          token: payload.token
        }
      });

      let response = await res.json();
      if (response && response.msg === "Product removed from the cart") {
        dispatch({
          type: REMOVE_SINGLE_CART_REQUEST_SUCESS,
          payload: response.msg
        })
      }
      return response;
    } catch (error) {
      dispatch({
        type: REMOVE_SINGLE_CART_REQUEST_FAILUE
      })
    }
  }
}

const removerAllCartAction = (payload) => {
  return async (dispatch) => {
//  console.log("payload::-", payload)
    dispatch({
      type: REMOVE_ALL_CART_REQUEST
    })
    try {
      let res = await fetch(`http://localhost:8080/api/cart/remove/all`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json",
          token: payload
        }
      });

      let response = await res.json();
      if (response && response.hint === "reAlSuc") {
        dispatch({
          type: REMOVE_ALL_CART_REQUEST_SUCESS,
          payload: response.msg
        })
      }
      return response;
    } catch (error) {
      dispatch({
        type: REMOVE_ALL_CART_REQUEST_FAILUE
      })
    }
  }
}

const IncCartQuantytiAction = (payload) => {
  return async (dispatch) => {
//  console.log("payload::-", payload)
    dispatch({
      type: INCREMENT_CART_QUANTYTI_REQUEST
    })
    try {
      let res = await fetch(`http://localhost:8080/api/cart/incrementQuantity`, {
        method: "PATCH",
        body: JSON.stringify({productId: payload.productId}),
        headers: {
          'Content-Type': "application/json",
          token: payload.token
        }
      });

      let response = await res.json();
      if (response && response.hint === "incQty") {
        dispatch({
          type: INCREMENT_CART_QUANTYTI_REQUEST_SUCESS,
          payload: response.msg
        })
      }
      return response;
    } catch (error) {
      dispatch({
        type: INCREMENT_CART_QUANTYTI_REQUEST_FAILUE
      })
    }
  }
}


const DecCartQuantytiAction = (payload) => {
  return async (dispatch) => {
//  console.log("payload::-", payload)
    dispatch({
      type: DECREMENT_CART_QUANTYTI_REQUEST
    })
    try {
      let res = await fetch(`http://localhost:8080/api/cart/decrementQuantity`, {
        method: "PATCH",
        body: JSON.stringify({productId: payload.productId}),
        headers: {
          'Content-Type': "application/json",
          token: payload.token
        }
      });

      let response = await res.json();
      if (response && response.hint === "decQty") {
        dispatch({
          type: DECREMENT_CART_QUANTYTI_REQUEST_SUCESS,
          payload: response.msg
        })
      }
      return response;
    } catch (error) {
      dispatch({
        type: DECREMENT_CART_QUANTYTI_REQUEST_FAILUE
      })
    }
  }
}


export {
  getData,
  getProductDetails,
  addReviewAction,
  addToCartAction,
  getCartData,
  removerSingleCartAction,
  removerAllCartAction,
  IncCartQuantytiAction,
  DecCartQuantytiAction
};

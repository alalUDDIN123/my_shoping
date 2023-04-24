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
} from "../../../Constant/actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;



const getProductsData = (params = {}) => {
    return async (dispatch) => {
      // console.log("params from action:-", params);
  
      dispatch({ type: GET_PRODUCT_REQUEST });
      try {
        let url = `${BASE_URL}/api/products/get`;
  
        const queryParams = [];
        for (const key in params) {
          if (Array.isArray(params[key])) {
            // console.log("params[key]::-",params[key],"key::-",key);
            if (params[key].length === 1) {
              queryParams.push(`${key}=${params[key][0]}`);
            } else if (params[key].length > 1) {
              params[key].forEach((value) => {
                queryParams.push(`${key}=${value}`);
              });
            }
          } else {
            queryParams.push(`${key}=${params[key]}`);
          }
        }

        console.log('queryParams::-',queryParams);
  
        const query = queryParams.join("&");
  
        //    console.log("query::-",query);
        if (query) {
          url += `?${query}`;
        }
  
        console.log(url, "this is get data url");
  
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

export {
    getProductsData,
    getProductDetails,
    addReviewAction
}
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_FAILUE,
  GET_PRODUCT_REQUEST_SUCESS,
} from "../../Constant/actionTypes";

const getData = (params = {}) => {
  return async (dispatch) => {
    console.log("params from action:-", params);

    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
      let url = "http://localhost:8080/api/products/get?";

      if (params.page) {
        url += `page=${params.page}&`;
      }
      if (params.limit) {
        url += `limit=${params.limit}&`;
      }
      if (params.category && params.category !== "" && params.category !== null) {
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

      if (params.minPrice && params.minPrice !== "" && params.minPrice !== null && params.minPrice !== 0) {
        url += `minPrice=${params.minPrice}&`;
      }
      if (params.maxPrice && params.maxPrice !== "" && params.maxPrice !== null && params.maxPrice !== 0) {
        url += `maxPrice=${params.maxPrice}&`;
      }

      if (params.sort && params.sort !== "" && params.sort !== null) {
        url += `_sort=${params.sort}&`;
      }

      if (params.order && params.order !== "" && params.order !== null) {
        url += `_order=${params.order}&`;
      }

      if (params.ratings && params.ratings !== "" && params.ratings !== null && params.ratings !== 0) {
        url += `ratings=${params.ratings}&`;
      }

      let res = await fetch(url);
      let data = await res.json();
      // console.log("data::-", data);
      dispatch({ type: GET_PRODUCT_REQUEST_SUCESS, payload: data.products });

    } catch (error) {
      dispatch({ type: GET_PRODUCT_REQUEST_FAILUE });
    }
  };
};

export { getData };

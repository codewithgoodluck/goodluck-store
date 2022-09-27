import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url, single_product_url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],

  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

// Note:
// 1. useReducer is used to definde the reducer and the inital state
// 2. action type is what is needed by the reducer to make changes to the state
// 3. distpacth send the action type to the reducer
// 4. reducer make changes to the state using the action type
// 5. paylaod is what is requeued by the reducer to perform the action
//  6. you can pass a data as a payload to an action for the reducer to work with

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url) => {
    // check for loading
    dispatch({ type: GET_PRODUCTS_BEGIN });
    // dispatch({type: GET_PRODUCTS_SUCCESS})
    // dispatch({type: GET_PRODUCTS_ERROR})
    // dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    try {
      const response = await axios.get(url);
      const products = response.data;
      console.log(products);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

    try {
      const single_product = await axios.get(url);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: single_product });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar,fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};

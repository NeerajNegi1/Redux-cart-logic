import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  const productData = await axios.get(
    "http://localhost:8080/products/productfetch"
  );
  dispatch({
    type: "FETCH_PRODUCTS",
    payload: {
      products: productData.data,
    },
  }); 
  dispatch({
    type: "IS_PRODUCT_LOADED",
  }); 
};

export const addToCart = (product) => {
    return({
        type: "ADD_TO_CART",
        payload: product
    })
}

export const removeFromCart = (product) => {
  return({
      type: "REMOVE_FROM_CART",
      payload: product
  })
}
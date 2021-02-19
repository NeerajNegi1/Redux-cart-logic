import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Products from "../../Components/Product/Products";
import { fetchProducts } from "../../Store/actions";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import "./ShoppingCart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const state = useSelector((state) => state.productsReducer);

  const allProducts = state.products;
  return (
    <div className="shopping_cart_page">
      <h1 style={{ textAlign: "center" }}>Shopping Cart</h1>
      {!state.isProductsLoaded ? (
        <span className="loader">
          <h1>Fetching Products</h1>
          <CircularProgress />
        </span>
      ) : (
        allProducts.map((eachItem) => {
          return (
            <Products
              key={eachItem._id}
              id={eachItem._id}
              title={eachItem.title}
              price={eachItem.price}
              rating={eachItem.rating}
              image={eachItem.image}
            />
          );
        })
      )}
      {state.isProductsLoaded && (
        <div className="checkout_btn">
          <Link to="/checkout">
            <button className="btn_product_list">Proceed For Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

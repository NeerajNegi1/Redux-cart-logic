import React, { useEffect } from "react";
import "../CheckoutProducts/CheckoutProducts.css";

// importing actions
import { addToCart, removeFromCart } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";

const CheckoutProducts = ({ id }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.productsReducer.cart);
  const currentproduct = cart.filter((eachItem) => eachItem.id === id);

  const addProductToCart = (
    id,
    title,
    price,
    rating,
    image,
    qty,
    originalprice
  ) => {
    const product = {
      id,
      title,
      price,
      rating,
      image,
      qty,
      originalprice,
    };
    dispatch(addToCart(product));
  };

  const removeProductFromCart = (
    id,
    title,
    price,
    rating,
    image,
    qty,
    originalprice
  ) => {
    const product = {
      id,
      title,
      price,
      rating,
      image,
      qty,
      originalprice,
    };
    dispatch(removeFromCart(product));
  };

  return (
    <div className="product_container">
      <div className="product_img">
        <img
          className="product_image"
          src={currentproduct[0].image}
          alt={currentproduct[0].title}
        />
      </div>
      <div className="product_details">
        <h2 className="product_title">{currentproduct[0].title}</h2>
        <p style={{ fontWeight: "bold" }}>
          Price ${currentproduct[0].originalprice}
        </p>
        <p style={{ fontWeight: "bold" }}>Total ${currentproduct[0].price}</p>
        <div className="btn_add_remove_container">
          <button onClick={() =>
              removeProductFromCart(
                currentproduct[0].id,
                currentproduct[0].title,
                currentproduct[0].price,
                currentproduct[0].rating,
                currentproduct[0].image,
                currentproduct[0].qty,
                currentproduct[0].originalprice
              )
            } className="btn_add_remove">-</button>
          <p>{currentproduct[0].qty}</p>
          <button
            onClick={() =>
              addProductToCart(
                currentproduct[0].id,
                currentproduct[0].title,
                currentproduct[0].price,
                currentproduct[0].rating,
                currentproduct[0].image,
                currentproduct[0].qty,
                currentproduct[0].originalprice
              )
            }
            className="btn_add_remove"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;

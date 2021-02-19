import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/actions";
import "../Product/Product.css";
import { Container } from "@material-ui/core";

const Products = ({ id, title, price, rating, image }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.productsReducer.cart);
  let quantity = 0;
  let individualTotal = 0;

  cart.map((eachItem) => {
    if (eachItem.id === id) {
      quantity = eachItem.qty;
      individualTotal = eachItem.price;
    }
  });

  const onHandlerAddToCart = (id, title, price, rating, image, qty = 1) => {
    const product = {
      id,
      title,
      price,
      rating,
      image,
      qty,
      originalprice: price,
    };
    dispatch(addToCart(product));
  };
  return (
    <Container fixed>
      <div className="product_container">
        <div className="product_img">
          <img className="product_image" src={image} alt={title} />
        </div>
        <div className="product_details">
          <h2 className="product_title">{title}</h2>
          <div style={{ fontWeight: "bold" }}>
            ${price} ✕ {quantity}
          </div>
          <p style={{ fontWeight: "bold" }}>Total ${individualTotal}</p>
          <button
            onClick={() => onHandlerAddToCart(id, title, price, rating, image)}
            className="btn_product_list"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Products;

import React from "react";
import { useSelector } from "react-redux";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
import { Container } from "@material-ui/core";
import CheckoutProducts from "../../Components/CheckoutProducts/CheckoutProducts";
import "../CheckoutPage/CheckoutPage.css";

const CheckoutPage = () => {
  let totalQuantity = 0;
  let totalPrice = 0;
  const cart = useSelector((state) => state.productsReducer.cart);

  cart.map((eachItem) => {
    totalQuantity = totalQuantity + eachItem.qty;
      totalPrice = totalPrice + eachItem.price;
  });

  return (
    <div className="checkout_products_container">
      <h1>Proceed For Checkout</h1>
      <div className="shopping_cart">
        <ShoppingCartSharpIcon style={{ fontSize: "2.5rem" }} />
        <p>{totalQuantity}</p>
        <div className="total_price">
          <p>Total ${totalPrice}</p>
        </div>
      </div>
      <Container>
        {cart.map((eachItem) => {
          return (
            <CheckoutProducts
              key={eachItem.id}
              id={eachItem.id}
              image={eachItem.image}
              price={eachItem.price}
              qty={eachItem.qty}
              rating={eachItem.rating}
              title={eachItem.title}
              originalprice={eachItem.originalprice}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default CheckoutPage;

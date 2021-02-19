import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// importing all pages
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ShoppingCart />
          </Route>
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

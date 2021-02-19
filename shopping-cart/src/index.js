import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// setting up redux
import { createStore, applyMiddleware, compose } from "redux";
// connection redux with react
import { Provider } from "react-redux";
// importing root reducer
import rootReducer from "./Store";
// importing redux thunk for feching data
import thunk from "redux-thunk";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

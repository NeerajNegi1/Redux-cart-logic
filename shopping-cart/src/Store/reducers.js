const productInitialState = {
  products: [],
  cart: [],
  productIdInCart: [],
  isProductsLoaded: false,
};

const productsReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
      };
    case "ADD_TO_CART":
      if (state.productIdInCart.includes(action.payload.id)) {
        const newdata = {
          products: [...state.products],
          cart: [...state.cart],
          productIdInCart: [...state.productIdInCart],
          isProductsLoaded: true,
        };
        newdata.cart.map((eachItem) => {
          if (eachItem.id === action.payload.id) {
            eachItem.qty++;
            eachItem.price = eachItem.price + action.payload.originalprice;
          }
        });
        return newdata;
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
          productIdInCart: [...state.productIdInCart, action.payload.id],
        };
      }
    case "REMOVE_FROM_CART":
      const newdata = {
        products: [...state.products],
        cart: [...state.cart],
        productIdInCart: [...state.productIdInCart],
        isProductsLoaded: true,
      };
      let newRemovedProductId = [...newdata.productIdInCart];
      // passing all ids to newid because of newdata is getting an empty array in return statement
      let newId = [...newRemovedProductId];
      // for lessing quantity
      newdata.cart.map((eachItem) => {
        if (eachItem.id === action.payload.id && eachItem.qty >= 1) {
          eachItem.qty--;
          eachItem.price = eachItem.price - action.payload.originalprice;
        }
      });
      // ------
      // for filtering item from the cart
      const cartItems = newdata.cart.filter((eachItem) => {
        if (eachItem.id === action.payload.id && eachItem.qty == 0) {
          newId = newRemovedProductId.filter((id) => {
            return id !== action.payload.id;
          });
          return eachItem.id !== action.payload.id;
        } else {
          return eachItem;
        }
      });
      // ----------
      return {
        products: [...state.products],
        cart: cartItems,
        productIdInCart: newId,
        isProductsLoaded: true,
      };
    case "IS_PRODUCT_LOADED":
      return {
        ...state,
        isProductsLoaded: true,
      };
    default:
      return { ...state };
  }
};

export default productsReducer;

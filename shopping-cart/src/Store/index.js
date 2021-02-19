import productsReducer from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    productsReducer
})

export default rootReducer;
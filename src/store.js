import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { bookListReducer } from "./redux/bookListReducer/bookListReducer";
import { cartReducer } from "./redux/cartReducer/cartReducer";
import { orderReducer } from "./redux/orderRedux/orderReducer";
import { paymentReducer } from "./redux/paymentRedux/paymentReducer";
import { productReducer } from "./redux/productRedux/productReducer";
import { shippingReducer } from "./redux/shippingRedux/shippingReducer";
import { userInfoReducer } from "./redux/userRedux/userReducer";

const reducer = combineReducers({
  bookList: bookListReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  payment: paymentReducer,
  user: userInfoReducer,
  order: orderReducer,
  book: productReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;

const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : undefined;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  user: { userInfo: userInfoFromStorage },
  shipping: { shippingInfo: shippingInfoFromStorage },
};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

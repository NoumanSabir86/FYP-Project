import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import Cookie from "js-cookie";

const middleware = [thunk];
const cartItems = Cookie.getJSON("cart") || [];
const initialState = { cart: { cartItems } };

const makeStore = () =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
//const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore);

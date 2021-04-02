import * as t from "../types";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case t.CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(
        (x) => x.productID === item.productID
      );

      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.productID === product.productID ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case t.CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(
          (x) => x.productID !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;

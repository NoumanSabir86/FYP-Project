import * as t from "../types";
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case t.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case t.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case t.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

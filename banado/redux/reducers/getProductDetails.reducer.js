import * as t from "../types";

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case t.PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case t.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case t.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

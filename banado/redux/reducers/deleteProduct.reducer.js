import * as t from "../types";

const deleteProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case t.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case t.PRODUCT_DELETE_SUCCESS:
      return {
        product: action.payload,
        success: true,
        loading: false,
      };
    case t.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default deleteProductReducer;

import * as t from "../types";

const addNewProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case t.PRODUCT_ADD_REQUEST:
      return { loading: true };
    case t.PRODUCT_ADD_SUCCESS:
      return {
        product: action.payload,
        success: true,
        loading: false,
      };
    case t.PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default addNewProductReducer;

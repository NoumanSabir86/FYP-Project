import * as t from "../types";

export const PAYMENT_WITH_API_Reducer = (state = { resData: {} }, action) => {
  switch (action.type) {
    case t.PAYMENT_REQUEST:
      return { loading: true };
    case t.PAYMENT_SUCCESS:
      return { loading: false, resData: action.payload };
    case t.PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

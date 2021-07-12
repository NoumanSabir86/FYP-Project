import * as t from "../types";
import Axios from "axios";

const getStoreProducts = (sellerID) => async (dispatch) => {
  try {
    dispatch({ type: t.STORE_PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get(
      "https://server-banado.herokuapp.com/api/products/byStore/" + sellerID
    );

    dispatch({ type: t.STORE_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: t.STORE_PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export default getStoreProducts;

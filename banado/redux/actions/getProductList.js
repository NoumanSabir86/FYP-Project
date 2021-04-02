import * as t from "../types";
import Axios from "axios";

const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get("http://localhost:3001/api/products/");

    dispatch({ type: t.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: t.PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export default getProductList;

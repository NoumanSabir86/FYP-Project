import Axios from "axios";
import * as t from "../types";

const getProductDetails = (productID) => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_DETAILS_REQUEST, payload: productID });
    const { data } = await Axios.get(
      "https://server-banado.herokuapp.com/api/products/" + productID
    );

    dispatch({ type: t.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: t.PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

export default getProductDetails;

import productServices from "../../Services/productServices";
import * as t from "../types";

const deleteProduct = (productID) => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_DELETE_REQUEST, payload: productID });
    const product = await productServices.deleteProduct(productID).catch();

    dispatch({
      type: t.PRODUCT_DELETE_SUCCESS,
      payload: product,
      success: true,
    });
  } catch (error) {
    dispatch({ type: t.PRODUCT_DELETE_FAIL, payload: error });
  }
};

export default deleteProduct;

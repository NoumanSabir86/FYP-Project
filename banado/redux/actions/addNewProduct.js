import * as t from "../types";
import productServices from "../.././Services/productServices";

const addNewProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_ADD_REQUEST, payload: product });
    const { data } = await productServices.addProduct(product).catch((err) => {
      consle.log(error);
    });

    dispatch({ type: t.PRODUCT_ADD_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: t.PRODUCT_ADD_FAIL, payload: error });
  }
};

export default addNewProduct;

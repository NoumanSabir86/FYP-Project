import { toast } from "react-toastify";
import * as t from "../types";

const deleteProduct = (productID) => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_DELETE_REQUEST, payload: productID });
    const product = await productServices
      .deleteProduct(productID)
      .catch((err) =>
        toast.error(err.response.data, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );

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

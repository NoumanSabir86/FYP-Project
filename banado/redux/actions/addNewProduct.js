import * as t from "../types";
import productServices from "../.././Services/productServices";
import { ToastContainer, toast } from "react-nextjs-toast";

const notify = (error, type) => {
  toast.notify(error, {
    duration: 2,
    type: type,
    title: type,
  });
};

const addNewProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_ADD_REQUEST, payload: product });
    const { data } = await productServices
      .addProduct(product)
      .then((res) => {
        notify("Product added Successfully!", "success");

        setTimeout(() => {
          window.location.href = "/Seller/CreateProduct";
        }, 2000);
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });

    dispatch({ type: t.PRODUCT_ADD_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: t.PRODUCT_ADD_FAIL, payload: error });
  }
};

export default addNewProduct;

import * as t from "../types";
import productServices from "../.././Services/productServices";
import { ToastContainer, toast } from "react-nextjs-toast";

const notify = (error, type) => {
  toast.notify(error, {
    duration: 5,
    type: type,
    title: type,
  });
};

const addNewProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: t.PRODUCT_ADD_REQUEST, payload: product });
    const { data } = await productServices.addProduct(product).catch((err) => {
      <div>
        {" "}
        <ToastContainer align={"right"} position={"bottom"} />;
      </div>;
      notify(err.response.data, "error");
    });

    dispatch({ type: t.PRODUCT_ADD_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: t.PRODUCT_ADD_FAIL, payload: error });
  }
};

export default addNewProduct;

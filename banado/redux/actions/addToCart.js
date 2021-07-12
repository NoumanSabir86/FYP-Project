import Axios from "axios";
import * as t from "../types";

import Cookie from "js-cookie";

const addtoCart = (productID, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      "https://server-banado.herokuapp.com/api/products/" + productID
    );

    dispatch({
      type: t.CART_ADD_ITEM,
      payload: {
        productID: data._id,
        storeId: data.storeId,
        productName: data.productName,

        stockQuantity: data.stockQuantity,
        salePrice: data.salePrice,
        shortDescription: data.shortDescription,
        productImage: data.productImage,
        qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cart", JSON.stringify(cartItems));
  } catch (error) {}
};

export default addtoCart;

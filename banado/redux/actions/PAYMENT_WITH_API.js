import axios from "axios";
import * as t from "../types";

const PAYMENT_WITH_API = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: t.PAYMENT_REQUEST, payload: data });
    axios
      .post(
        "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction",

        data
      )
      .then((response) => {
        if (response.data.pp_ResponseCode === "000") {
          axios.post("http://localhost:3001/api/order/test", response.data);
          dispatch({
            type: t.PAYMENT_SUCCESS,
            payload: response.data,
            success: true,
          });
        } else {
          console.log(response.data.pp_ResponseMessage);
          //throw new Error(response.data.pp_ResponseMessage);
        }
        console.log(response.data);
      });
  } catch (error) {
    dispatch({ type: t.PAYMENT_FAIL, payload: error });
  }
};

export default PAYMENT_WITH_API;

import axios from "axios";
import * as t from "../types";
import { ToastContainer, toast } from "react-nextjs-toast";
import Cookies from "js-cookie";

const notify = (error, type) => {
  toast.notify(error, {
    duration: 5,
    type: type,
    title: type,
  });
};

const PAYMENT_WITH_API = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: t.PAYMENT_REQUEST, payload: data });
    axios
      .post(
        "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Purchase/PAY",

        data
      )
      .then((response) => {
        if (response.data.responseCode === "000") {
          notify("Trasaction Successfull!", "success");
        } else {
          notify(response.data.responseMessage, "error");
        }
        console.log(response.data);
      });
  } catch (error) {
    notify(error.response.data, "error");
  }
};

export default PAYMENT_WITH_API;

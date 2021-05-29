import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-nextjs-toast";
import { useDispatch, useSelector } from "react-redux";
import { SellerNav } from "../../Components/Accounts/SellerNav";
import Loader from "../../Components/Loader";
import { storage } from "../../firebase";
import getProductDetails from "../../redux/actions/getProductDetails";
import productServices from "../../Services/productServices";
import UserServices from "../../Services/UserServices";
import cookie from "cookie";
const UpdateOrder = (props) => {
  const order = props.data;

  const [status, setStatus] = useState("");

  const [products, setProducts] = useState("");
  console.log(props.data);
  const dispatch = useDispatch();

  let temp,
    names = "";

  order.products.map((i) => {
    temp = ",";
    names = names + i.productName + temp;
  });

  console.log(names);

  const notify = (error, type) => {
    toast.notify(error, {
      duration: 5,
      type: type,
      title: type,
    });
  };

  const updateData = async () => {
    console.log(status);
    await axios
      .put("http://localhost:3001/api/order/" + order._id, { status })
      .then((res) => {
        notify(res.data, "success");
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });
  };

  return (
    <>
      <div>
        <SellerNav />
        <div>
          <p className="heading4 ml-20 mt-14 text-bold ">
            ORDER NO: {order.orderNumber}
          </p>
          <ToastContainer />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
          <div>
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Cutomer ID
            </label>
            <input
              //   onChange={(e) => setName(e.target.value)}
              value={order.userId}
              disabled
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter Name"
            />
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Date Created
            </label>
            <input
              //   onChange={(e) => setEmail(e.target.value)}
              value={order.orderDate}
              type="text"
              disabled
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Stock Quantity"
            />

            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Total Bill
            </label>
            <input
              //   onChange={(e) => setAddress(e.target.value)}
              value={order.total}
              disabled
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Price"
            />
          </div>
          <div>
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Products
            </label>
            <input
              disabled
              //   onChange={(e) => setShopName(e.target.value)}
              value={names}
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter Brand"
            />
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              <span class="text-gray-700">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                class="form-select  block w-full rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  ring-2 focus:ring-purple-600 ring-purple-600 focus:border-transparent"
              >
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          <div>
            {" "}
            <button
              onClick={() => {
                updateData();
              }}
              className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie);

    const data1 = await axios
      .get("http://localhost:3001/api/order/" + parsedCookies.orderId)
      .catch((err) => {
        console.log(err);
      });

    return { props: { data: data1.data } };
  } catch (error) {
    return { props: {} };
  }
};

export default UpdateOrder;

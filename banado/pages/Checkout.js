import React from "react";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../Components/Footer";
import Link from "next/link";

import cryptoJs from "crypto-js";
import moment from "moment";
import axios from "axios";
import { ControlCameraOutlined } from "@material-ui/icons";
import PAYMENT_WITH_API from "../redux/actions/PAYMENT_WITH_API";
import { ToastContainer, toast } from "react-nextjs-toast";
const Checkout = () => {
  const dispatch = useDispatch();
  const IntegritySalt = "zb3wx91x3x";
  let initial = {
    pp_Version: "1.1",
    pp_InstrToken: "9580698967588146",
    pp_TxnType: "MPAY",
    pp_TxnRefNo: "T" + moment().format("YYYYMMDDHHmmss").toString(),
    pp_MerchantID: "MC19909",
    pp_Password: "u2x8a91bc2",
    pp_Amount: "300000",
    pp_TxnCurrency: "PKR",
    pp_TxnExpiryDateTime: moment().format("YYYYMMDDHHmmss").toString(),
    pp_BillReference: "billRef",
    pp_Description: "Description of transaction",
    pp_CustomerCardNumber: "5123456789012346",
    pp_CustomerCardExpiry: "",
    pp_CustomerCardCvv: "",
    pp_SecureHash:
      "F7B1A84D3FAB930CE419C29552C9FB71A62449917354DB4A676F81A3B40CADA8",
    pp_Frequency: "SINGLE",
    pp_TxnDateTime: moment().format("YYYYMMDDHHmmss").toString(),
  };
  const handelSubmit = () => {
    let a = { ...data };

    a.pp_Amount = a.pp_Amount + "00";
    let hashString =
      IntegritySalt +
      "&" +
      a.pp_Amount +
      "&" +
      a.pp_BillReference +
      "&" +
      a.pp_CustomerCardNumber +
      "&" +
      a.pp_CustomerCardExpiry +
      "&" +
      a.pp_CustomerCardCvv +
      "&" +
      a.pp_Description +
      "&" +
      a.pp_Frequency +
      "&" +
      a.pp_InstrToken +
      "&" +
      +a.pp_MerchantID +
      "&" +
      a.pp_Password +
      "&" +
      a.pp_SecureHash +
      "&" +
      a.pp_TxnType +
      "&" +
      a.pp_TxnRefNo +
      "&" +
      a.pp_TxnCurrency +
      "&" +
      a.TxnExpiryDateTime +
      "&" +
      a.pp_TxnDateTime +
      "&" +
      a.pp_Version;

    let hash = cryptoJs.HmacSHA256(hashString, IntegritySalt).toString();
    a.pp_SecureHash = hash;

    dispatch(PAYMENT_WITH_API(a, "874238749832749823"));
  };

  const [data, setData] = React.useState(initial);

  //const [cvc, setCvc] = React.useState("");
  //const [expiry, setExpiry] = React.useState("");
  const [focus, setFocus] = React.useState("");
  const [name, setName] = React.useState("");
  //const [number, setNumber] = React.useState("");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "pp_CustomerCardNumber") {
      setData({ ...data, pp_CustomerCardNumber: value });
    } else if (name == "pp_CustomerCardExpiry") {
      setData({ ...data, pp_CustomerCardExpiry: value });
    } else if (name == "pp_CustomerCardCvv") {
      setData({ ...data, pp_CustomerCardCvv: value });
    } else if (name == "name") {
      setName(value);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10%" }}>
        <Navbar />
        <Hero name={"Checkout"} />
        <div class="flex  justify-center mb-8 -mt-20">
          <ToastContainer />
          <div
            class="flex flex-col w-full p-14 text-gray-800 bg-white rounded-lg  pin-r pin-y md:w-4/5 lg:w-4/5"
            style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          >
            <div class="flex-1">
              <span
                className="heading3"
                style={{
                  borderBottom: "5px solid #00235A",
                  fontSize: "34px",
                }}
              >
                Order Total
              </span>

              <table
                class=" w-full text-sm lg:text-base"
                style={{ marginTop: "2%" }}
                cellspacing="0"
              >
                <thead>
                  <tr class="h-12 uppercase">
                    <th class="text-left">Product</th>
                    <th class="lg:text-center text-left pl-5 lg:pl-0">
                      <span class="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span class="hidden lg:inline">Quantity</span>
                    </th>
                    <th class="hidden text-right lg:text-center md:table-cell">
                      Unit price
                    </th>
                    <th class="text-right">Total price</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.length === 0 ? (
                    <tr>Cart is empty</tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr className="border-t pt-2 pb-2">
                        <td>
                          <div className="flex flex-row align-middle items-center">
                            <div>
                              <a href="#">
                                <img
                                  src={item.productImage}
                                  class="w-20 rounded"
                                  alt="Thumbnail"
                                ></img>
                              </a>
                            </div>
                            <div>
                              <p class=" md:ml-4 ">{item.productName}</p>
                            </div>
                          </div>
                        </td>
                        <td class=" justify-center md:justify-end lg:justify-center md:flex mt-6">
                          <div class="w-20 h-10">
                            <div class="relative flex flex-row ml-8 w-full h-8">
                              {item.qty}
                            </div>
                          </div>
                        </td>
                        <td class="hidden text-right lg:text-center md:table-cell">
                          <span class="text-sm lg:text-base font-medium">
                            Rs.{item.salePrice}
                          </span>
                        </td>
                        <td class="text-right">
                          <span class="text-sm lg:text-base  font-medium">
                            Rs.{item.salePrice * item.qty}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div
                class="pt-2  mt-4"
                style={{
                  borderTop: "3px solid #00235A",
                }}
              >
                <div class="flex justify-between border-b">
                  <div class="lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Cart Subtotal
                  </div>
                  <div class=" lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    Rs.
                    {cartItems.reduce((a, b) => a + b.salePrice * b.qty, 0)}
                  </div>
                </div>

                <div class="flex justify-between pt-4 border-b">
                  <div class=" lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Shipping Cost
                  </div>
                  <div class="lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    Rs.0
                  </div>
                </div>

                <div class="flex justify-between pt-4 border-b">
                  <div class=" lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Total
                  </div>
                  <div class=" lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    Rs.
                    {cartItems.reduce((a, b) => a + b.salePrice * b.qty, 0)}
                  </div>
                </div>
              </div>

              {cartItems.length > 0 && (
                <>
                  <div class="my-4 mt-20 -mx-2 lg:flex items-start pr-48 ">
                    {" "}
                    <span
                      className="heading3 "
                      style={{
                        borderBottom: "5px solid #00235A",
                        fontSize: "34px",
                      }}
                    >
                      Payment Details:
                    </span>
                  </div>
                  <div class="my-4 mt-12 -mx-2 lg:flex items-start pr-96 ">
                    <div class="lg:px-2 lg:w-1/2">
                      <Cards
                        cvc={data.pp_CustomerCardCvv}
                        expiry={data.pp_CustomerCardExpiry}
                        focused={focus}
                        name={name}
                        number={data.pp_CustomerCardNumber}
                        issuer="visa"
                      />
                    </div>
                    <div class="lg:px-2 lg:w-1/2 ">
                      <div id="PaymentForm">
                        <input
                          type="text"
                          className="rounded-sm  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          name="pp_CustomerCardNumber"
                          placeholder="Card Number"
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        <input
                          type="text"
                          className="rounded-sm mb-4 mt-8 border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          name="name"
                          placeholder="Name"
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        <div className="flex flex-row">
                          <div>
                            <input
                              type="text"
                              className="rounded-sm mb-4 border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              name="pp_CustomerCardExpiry"
                              placeholder="MM/YY"
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                            />
                          </div>
                          <div className="pl-8">
                            <input
                              type="tel"
                              className="rounded-sm  mb-4 border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              name="pp_CustomerCardCvv"
                              placeholder="CVV"
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              handelSubmit();
                            }}
                            class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-sm shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                          >
                            <svg
                              aria-hidden="true"
                              data-prefix="far"
                              data-icon="credit-card"
                              class="w-8"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                              />
                            </svg>
                            <span class="ml-2 mt-5px">Place Order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

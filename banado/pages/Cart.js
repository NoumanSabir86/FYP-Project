import axios from "axios";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../Components/Footer";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import addtoCart from "../redux/actions/addToCart";
import cartRemove from "../redux/actions/cartRemove";
import UserServices from "../Services/UserServices";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [quantity, setQuantity] = React.useState(1);
  const [action, setAction] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [streetAddress, setStreetAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(async () => {
    await axios
      .get(
        `http://localhost:3001/api/users/shipping/${
          UserServices.getLoggedinfo()._id
        }`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data != false) {
          setStreetAddress(res.data.streetAddress);
          setCity(res.data.city);
          setPostalCode(res.data.postalCode);
          setAction("Update");
          setMessage("");
        } else {
          setAction("Add");
          setMessage("Add Shipping Address To proceed Further");
        }
      });
  }, [action]);

  const removeFromCart = (productID) => {
    dispatch(cartRemove(productID));
  };

  const shippingAddress = async () => {
    UserServices.getLoggedinfo().role == "Seller"
      ? await axios
          .post(
            "http://localhost:3001/api/users/shipping/" +
              UserServices.getLoggedinfo().userId,
            { streetAddress, city, postalCode }
          )
          .then((res) => {
            setAction("Added Successfully!");
          })
          .catch((err) => {
            console.log(err);
          })
      : await axios
          .post(
            "http://localhost:3001/api/users/shipping/" +
              UserServices.getLoggedinfo()._id,
            { streetAddress, city, postalCode }
          )
          .then((res) => {
            setAction("Added Successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const updateAddress = async () => {
    await axios
      .put(
        "http://localhost:3001/api/users/shipping/" +
          UserServices.getLoggedinfo()._id,
        { streetAddress, city, postalCode }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    dispatch(
      addtoCart(
        localStorage.getItem("productID"),
        localStorage.getItem("quantity")
      )
    );

    localStorage.removeItem("productID");
    localStorage.removeItem("quantity");
  }, []);

  return (
    <>
      <Navbar />
      {!UserServices.isLoggedin() && (
        <div>
          <div
            style={{
              textAlign: "center",
              height: "5vh",
              background: "#00235A",
              position: "fixed",
              top: "8.5%",
              zIndex: "999",
              verticalAlign: "middle",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                fontFamily: "open sans",
                fontSize: "18px",
                width: "100%",
                marginTop: "5px",
              }}
            >
              You need to{" "}
              <Link href="/SignIn">
                <b
                  style={{
                    color: "#FF5E16",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  login
                </b>
              </Link>{" "}
              first to place the order!
            </p>
          </div>
        </div>
      )}

      <div style={{ marginBottom: "10%" }}>
        <Hero name={"Cart"} />
        <div class="flex justify-center mb-8 lg:-mt-20 md:-mt-20 -mt-2">
          <div
            class="flex flex-col w-full md:p-14 lg:p-14 p-4  text-gray-800 bg-white rounded-lg  pin-r pin-y md:w-4/5 lg:w-4/5"
            style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          >
            <div class="flex-1">
              <table class=" w-full text-sm lg:text-base" cellspacing="0">
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
                      <tr className="border-t ">
                        <td>
                          <div className="flex flex-row">
                            <div className="dont">
                              <a href="#">
                                <img
                                  src={item.productImage}
                                  class="w-20 rounded"
                                  alt="Thumbnail"
                                ></img>
                              </a>
                            </div>
                            <div>
                              <p class="mb-2 md:ml-4">{item.productName}</p>

                              <button
                                class="text-gray-700 md:ml-4"
                                onClick={() => removeFromCart(item.productID)}
                              >
                                <small>(Remove item)</small>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class=" justify-center md:justify-end lg:justify-center md:flex mt-6">
                          <div class="w-20 h-10">
                            <div class="relative flex flex-row w-full h-8">
                              <select
                                class=" justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 w-20"
                                value={item.qty}
                                onChange={(e) => {
                                  dispatch(
                                    addtoCart(item.productID, e.target.value)
                                  );
                                }}
                              >
                                {[
                                  ...Array(
                                    parseInt(
                                      item.stockQuantity
                                        ? item.stockQuantity
                                        : 1
                                    )
                                  ).keys(),
                                ].map((x) => (
                                  <option value={x + 1}>{x + 1}</option>
                                ))}
                              </select>
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

              {cartItems.length > 0 && (
                <>
                  <div class=" lg:my-4 md:my-4 lg:mt-20 md:mt-20 lg:-mx-2 md:-mx-2 mt-4 lg:flex">
                    <div class="lg:px-2 lg:w-1/2">
                      <div class="p-4 bg-gray-100 rounded ">
                        <h1 class="ml-2  font-bold uppercase">
                          Add Shipping Address
                        </h1>
                      </div>
                      <div class="p-4 pl-0">
                        <label
                          class="text-gray-700 "
                          style={{ fontSize: "1.2rem" }}
                        >
                          <input
                            type="text"
                            value={streetAddress}
                            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Street Address"
                            onChange={(e) => setStreetAddress(e.target.value)}
                          />
                        </label>

                        <input
                          type="text"
                          value={city}
                          class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="City"
                          onChange={(e) => setCity(e.target.value)}
                        />

                        <input
                          type="text"
                          class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Postal Code"
                          onChange={(e) => setPostalCode(e.target.value)}
                          value={postalCode}
                        />

                        <button
                          onClick={() => {
                            action == "Add"
                              ? shippingAddress()
                              : updateAddress();
                          }}
                          className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
                        >
                          {action == "Add" ? "Add" : "Update"}
                        </button>
                      </div>
                    </div>
                    <div class="lg:px-2 lg:w-1/2">
                      <div
                        class="p-4 bg-gray-100 rounded shadow-lg"
                        style={{ background: "rgba(255, 95, 20,0.6)" }}
                      >
                        <h1 class="ml-6 text-white font-bold uppercase">
                          Cart Totals
                        </h1>
                      </div>
                      <div class="p-4">
                        <div class="flex justify-between border-b">
                          <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                            Cart Subtotal
                          </div>
                          <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                            Rs.
                            {cartItems.reduce(
                              (a, b) => a + b.salePrice * b.qty,
                              0
                            )}
                          </div>
                        </div>

                        <div class="flex justify-between pt-4 border-b">
                          <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                            Shipping Cost
                          </div>
                          <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                            Rs.0
                          </div>
                        </div>

                        <div class="flex justify-between pt-4 border-b">
                          <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                            Total
                          </div>
                          <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                            Rs.
                            {cartItems.reduce(
                              (a, b) => a + b.salePrice * b.qty,
                              0
                            )}
                          </div>
                        </div>
                        {UserServices.isLoggedin() && (
                          <>
                            {action == "Update" ? (
                              <Link href="/Checkout">
                                <a href="">
                                  <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
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
                                    <span class="ml-2 mt-5px">
                                      Procceed to checkout
                                    </span>
                                  </button>
                                </a>
                              </Link>
                            ) : (
                              <p className="p-4 w-full text-center text-lg ">
                                {message}
                              </p>
                            )}
                          </>
                        )}
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

export default Cart;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "../Components/Hero";

import { Navbar } from "../Components/Navbar";
import addtoCart from "../redux/actions/addToCart";
import cartRemove from "../redux/actions/cartRemove";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();

  const removeFromCart = (productID) => {
    dispatch(cartRemove(productID));
  };

  React.useEffect(() => {
    dispatch(
      addtoCart(
        localStorage.getItem("productID"),
        localStorage.getItem("quantity")
      )
    );
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Hero name={"Cart"} />
        <div class="flex justify-center mt-20">
          <div
            class="flex flex-col w-full p-14 text-gray-800 bg-white rounded-lg  pin-r pin-y md:w-4/5 lg:w-4/5"
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
                            Rs.{item.salePrice}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {cartItems.length > 0 && (
                <>
                  <div class="my-4 mt-20 -mx-2 lg:flex">
                    <div class="lg:px-2 lg:w-1/2">
                      <div class="p-4 bg-gray-100 rounded ">
                        <h1 class="ml-2  font-bold uppercase">
                          Calculate Shipping
                        </h1>
                      </div>
                      <div class="p-4 pl-0">
                        <label
                          class="text-gray-700 "
                          style={{ fontSize: "1.2rem" }}
                        >
                          <select
                            value="1"
                            defaultValue=""
                            // onChange={(e) => setCategory(e.target.value)}
                            class="form-select  block w-full rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          >
                            <option hidden value="">
                              Select Country
                            </option>
                            <option value="Architecture">Architecture</option>
                            <option value="Interior Design">
                              Interior Design
                            </option>
                            <option value="Electronics">Electronics</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>

                        <input
                          type="text"
                          class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Province"
                          // onChange={(e) => setBrandName(e.target.value)}
                        />

                        <input
                          type="text"
                          class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="City"
                          // onChange={(e) => setBrandName(e.target.value)}
                        />

                        <input
                          type="text"
                          class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Postal Code"
                          // onChange={(e) => setBrandName(e.target.value)}
                        />
                        <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
                          Update Totals
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
                            14,882.75€
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
                        <a href="#">
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
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar } from "../Components/Navbar";
import jwt_decode from "jwt-decode";

import UserServices from "../Services/UserServices";
import { toast, ToastContainer } from "react-nextjs-toast";
import storeServices from "../Services/storeServices";
import Link from "next/link";

const Register = () => {
  const [role, setRole] = React.useState("User");
  const [username, setUsername] = React.useState("");
  const [storeData, setStoreData] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [data, setData] = React.useState({});
  const [storeName, setStoreName] = React.useState("");
  const [sellerPhone, setSellerPhone] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [companyPhone, setCompanyPhone] = React.useState("");
  const [sellerId, setSellerId] = React.useState("");
  const [shopAddress, setShopAddress] = React.useState("");
  const [companyAddress, setCompanyAddress] = React.useState("");

  const toSend = () => {
    if (role == "User") {
      setData({
        username,
        email,
        password,
        role,
        repeatPassword,
      });
    } else if (role == "Seller") {
      setData({
        username,
        email,
        password,
        role,
        repeatPassword,
        storeName,
        sellerPhone,
        shopAddress,
      });
    } else {
      setData({
        username,
        email,
        password,
        role,
        repeatPassword,

        companyName,
        companyPhone,
        companyAddress,
      });
    }
  };

  const notify = (error, type) => {
    toast.notify(error, {
      duration: 5,
      type: type,
      title: type,
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer align={"right"} position={"bottom"} />
      <div>
        <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full space-y-8">
            <div
              style={{
                marginBottom: "-15%",
                zIndex: "5",
              }}
            >
              <img
                class="mx-auto h-24 w-auto"
                src="./logo.png"
                alt="Workflow"
              />
            </div>
            <div
              style={{
                borderRadius: "5px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <div className="pt-4 pb-16 pl-16 pr-16">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Create New Account
                </h2>

                <div class="space-y-4">
                  <div>
                    <label for="password" class="sr-only ">
                      username
                    </label>
                    <input
                      id="password"
                      name="username"
                      type="text"
                      required
                      class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      style={{ borderRadius: "5px", marginTop: "12%" }}
                      placeholder="Full Name"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <input type="hidden" name="remember" value="true" />
                  <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label for="email-address" class="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        style={{ borderRadius: "5px" }}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <label for="password" class="sr-only ">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        style={{ borderRadius: "5px", marginTop: "5%" }}
                        class="appearance-none rounded-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label for="password" class="sr-only ">
                        Re-enter Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        style={{ borderRadius: "5px", marginTop: "5%" }}
                        placeholder="Re-enter Password"
                        value={repeatPassword}
                        onChange={(e) => {
                          setRepeatPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <select
                        class="mt-4 block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        name="Select Role"
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <option value="User">User</option>
                        <option value="Seller">Seller</option>
                        <option value="Builder">Builder</option>
                      </select>
                    </div>
                  </div>

                  {role == "Seller" ? (
                    <>
                      {" "}
                      <div>
                        <label for="password" class="sr-only ">
                          Store name
                        </label>
                        <input
                          id="storename"
                          name="store name"
                          type="text"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder="Store name"
                          value={storeName}
                          onChange={(e) => {
                            setStoreName(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label for="password" class="sr-only ">
                          Phone Number
                        </label>
                        <input
                          name="phone Number"
                          type="text"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder="Phone Number"
                          value={sellerPhone}
                          onChange={(e) => {
                            setSellerPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label for="password" class="sr-only ">
                          Shop Address
                        </label>
                        <input
                          name="phone Number"
                          type="text"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder="Shop Address"
                          value={shopAddress}
                          onChange={(e) => {
                            setShopAddress(e.target.value);
                          }}
                        />
                      </div>
                      {/* <div>
                        <label for="password" class="sr-only ">
                          Tags
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autocomplete="current-password"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder="Enter related tags"
                        />
                      </div> */}
                    </>
                  ) : role == "Builder" ? (
                    <>
                      <div>
                        <label for="password" class="sr-only ">
                          Company name
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="text"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder=" Company name"
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label for="password" class="sr-only ">
                          Phone Number
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="text"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder="Phone Number"
                          value={companyPhone}
                          onChange={(e) => {
                            setCompanyPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label for="password" class="sr-only ">
                          Company Address
                        </label>
                        <input
                          name="phone Number"
                          type="text"
                          required
                          class="appearance-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          style={{ borderRadius: "5px", marginTop: "5%" }}
                          placeholder="Company Address"
                          value={companyAddress}
                          onChange={(e) => {
                            setCompanyAddress(e.target.value);
                          }}
                        />
                      </div>
                      {/* <div
                        style={{ position: "relative", alignItems: "center" }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Complete House Construction + Finishing
                          <input
                            id="password"
                            name="password"
                            type="radio"
                            role="false"
                            required
                            style={{
                              position: "absolute",
                              right: "1%",
                              marginTop: "1.5%",
                            }}
                          />
                        </p>
                      </div>
                      <div
                        style={{
                          position: "relative",
                          alignItems: "center",
                          marginBottom: "15%",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Grey Structure Construction
                          <input
                            id="password"
                            name="password"
                            type="radio"
                            role="false"
                            required
                            style={{
                              position: "absolute",
                              right: "1%",
                              marginTop: "1.5%",
                            }}
                          />
                        </p>
                      </div> */}
                    </>
                  ) : (
                    ""
                  )}

                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        for="remember_me"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium colorheading hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      onMouseEnter={toSend}
                      onClick={() => {
                        UserServices.register(data)
                          .then((res) => {
                            var decode = jwt_decode(res);
                            setSellerId(decode.userId);
                            alert("Account Created Successfully!");
                            if (role == "Seller") {
                              storeServices.createStore({
                                sellerId: decode.userId,
                                storeName,
                                sellerPhone,
                              });
                              window.location.href = "/SignIn";
                            }
                            window.location.href = "/SignIn";
                          })

                          .catch((err) => {
                            {
                              notify(err.response.data, "error");
                            }
                          });
                      }}
                      class="colortheme group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Account
                    </button>
                  </div>
                  {role !== "User" ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      {/* <div className="text-center">
                        <span>or</span>
                      </div>
                      <div>
                        <button
                          type="submit"
                          style={{ background: "#0E8BED" }}
                          class=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span class="  absolute left-0 inset-y-0 flex items-center pl-3">
                            <i
                              class="fab fa-facebook-f"
                              style={{ fontSize: "20px" }}
                            ></i>
                          </span>
                          Sign Up with Facebook
                        </button>
                      </div>
                      <div>
                        <button
                          type="submit"
                          style={{
                            background: "white",
                            border: "1px solid #F0F0F0",
                            color: "black",
                          }}
                          class=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span class="  absolute left-0 inset-y-0 flex items-center pl-3">
                            <i class="fab fa-google"></i>
                          </span>
                          Sign Up with Google
                        </button>
                      </div> */}
                      <div class="text-sm text-center">
                        <Link
                          href="/SignIn"
                          class="font-medium colorheading hover:text-indigo-500"
                        >
                          Already have an account? Login
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

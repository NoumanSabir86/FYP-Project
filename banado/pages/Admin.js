import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cookie from "cookie";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-nextjs-toast";
import { Navbar } from "../Components/Navbar";
import storeServices from "../Services/storeServices";
import UserServices from "../Services/UserServices";

const Admin = () => {
  const [role, setRole] = React.useState("Admin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const data = { email, password, role };

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
                  Admin Sign in
                </h2>

                <div class="mt-8 space-y-6">
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
                        class="appearance-none rounded-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
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
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        UserServices.login(data)
                          .then((res) => {
                            alert("Logged In!");

                            cookie.serialize(
                              "id",
                              UserServices.getLoggedinfo()._id
                            );
                            Cookies.set("id", UserServices.getLoggedinfo()._id);

                            if (role == "Seller") {
                              window.location.href = "/Seller/SellerDash";
                            } else if (role == "Builder") {
                              window.location.href = "/BuilderDash";
                            } else {
                              window.location.href = "/";
                            }
                          })
                          .catch((err) => {
                            {
                              notify(err.response.data, "error");
                            }
                          });
                      }}
                      class="colortheme group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span class="  absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          class=" h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;

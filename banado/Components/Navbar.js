import React, { useState } from "react";
import {
  faCoffee,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import UserServices from "../Services/UserServices";
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [log, setLog] = useState(false);

  React.useEffect(() => {
    try {
      setUsername(UserServices.getLoggedinfo().username);
      setLog(UserServices.isLoggedin());
    } catch (error) {}
  }, []);

  return (
    <div className="bg-white">
      <div className="  sm:max-w-xl md:max-w-full lg:max-w-screen-xl  items-start">
        <div className="relative flex items-start justify-start">
          <div className="flex items-center ">
            <Link href="/">
              <a
                style={{
                  fontSize: "2.2rem",
                  height: "92px",
                  background: "#FF5E14",
                  padding: "2rem 1rem",
                  color: "white",

                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                }}
                aria-label="Company"
                title="Company"
                className="inline-flex items-center md:w-3/12"
              >
                <span className="ml-2  tracking-wide  uppercase text-center ">
                  BANADO
                </span>
              </a>
            </Link>
            <ul
              className="flex items-center hidden space-x-8 lg:flex  ml-8"
              style={{
                justifyContent: "space-around",
                width: "1250px",
                color: "#00235A",
                fontSize: "1.1rem",
                height: "92px",
              }}
            >
              <li>
                <Link href="/">
                  <a
                    aria-label="Our product"
                    title="Our product"
                    className="font-medium tracking-wide text-blue transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/Store">
                  <a
                    aria-label="Our product"
                    title="Our product"
                    style={{ color: "#00235A" }}
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    Store
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/Services">
                  <a
                    style={{ color: "#00235A" }}
                    aria-label="Product pricing"
                    title="Product pricing"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    Services
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/ContactUs">
                  <a
                    style={{ color: "#00235A" }}
                    aria-label="About us"
                    title="About us"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    Contact Us
                  </a>
                </Link>
              </li>
              {!log && (
                <>
                  <li>
                    <Link href="/SignIn">
                      <a
                        style={{ color: "#00235A" }}
                        aria-label="About us"
                        title="About us"
                        className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                      >
                        Login
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Register">
                      <a
                        style={{ color: "#00235A" }}
                        aria-label="About us"
                        title="About us"
                        className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                      >
                        Sign Up
                      </a>
                    </Link>
                  </li>
                </>
              )}

              {log && (
                <>
                  <li
                    onClick={() => {
                      UserServices.logout();
                    }}
                  >
                    <Link href="/">
                      <a
                        style={{ color: "#00235A" }}
                        aria-label="About us"
                        title="About us"
                        className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                      >
                        <span className="ml-2">Logout</span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/">
                      <a
                        style={{ color: "#00235A" }}
                        aria-label="About us"
                        title="About us"
                        className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ fontSize: "20px" }}
                        />
                        <span className="ml-2">
                          {username !== "" ? <span>{username}</span> : ""}
                        </span>
                      </a>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/Cart">
                  <a
                    aria-label="About us"
                    style={{ color: "#00235A" }}
                    title="About us"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ fontSize: "20px" }}
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Home
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Store
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Services
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Categories
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="About us"
                          title="About us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          About us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Sign in"
                          title="Sign in"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Account
                        </a>
                      </li>
                      <li>
                        <a
                          className="inline-flex items-center justify-start w-full h-12 px-6 font-medium tracking-wide  transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          href="/"
                        >
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            style={{ fontSize: "20px" }}
                          />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

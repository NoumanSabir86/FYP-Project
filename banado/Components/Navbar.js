import React, { useState } from "react";
import {
  faCoffee,
  faShoppingBasket,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import UserServices from "../Services/UserServices";
import ActiveLink from "./ActiveLink";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Cookies from "js-cookie";
import cookie from "cookie";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 5,

    padding: "0 4px",
  },
}))(Badge);

export const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [log, setLog] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();
  const cartlink = (href) => {
    e.preventDefault();
    router.push(href);
  };

  React.useEffect(() => {
    try {
      setUsername(UserServices.getLoggedinfo().username);
      setLog(UserServices.isLoggedin());
      setRole(UserServices.getLoggedinfo().role);
    } catch (error) {}
  }, []);

  return (
    <div
      className="bg-white sticky top-0 z-50 shadow-md "
      style={{ height: "64px" }}
    >
      <div className="  sm:max-w-xl md:max-w-full lg:max-w-screen-xl  items-start">
        <div className="relative flex items-start justify-start">
          <div className="flex items-center ">
            <Link href="/">
              <a
                style={{
                  fontSize: "2.1rem",
                  height: "50px",
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
                height: "64px",
              }}
            >
              <li>
                <Link href="/">
                  <ActiveLink children="Home" href="/" />
                </Link>
              </li>
              <li>
                <Link href="/Store">
                  <ActiveLink children="Store" href="/Store" />
                </Link>
              </li>
              <li>
                <Link href="/Services">
                  <ActiveLink children="Services" href="/Services" />
                </Link>
              </li>

              <li>
                <Link href="/ContactUs">
                  <ActiveLink children="Contact Us" href="/ContactUs" />
                </Link>
              </li>
              {!log && (
                <>
                  <li>
                    <Link href="/SignIn">
                      <ActiveLink children="Login" href="/SignIn" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/Register">
                      <ActiveLink children="Sign Up" href="/Register" />
                    </Link>
                  </li>
                </>
              )}

              {log && (
                <>
                  {role == "User " && (
                    <>
                      <li
                        onClick={() => {
                          UserServices.logout();
                        }}
                      >
                        <Link href="/">
                          <a className="item font-medium tracking-wide  transition-colors duration-200 hover:text-teal-accent-400">
                            <span className="ml-2">Logout</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/UserOrders">
                          <a className="item font-medium tracking-wide  transition-colors duration-200 hover:text-teal-accent-400">
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{
                                fontSize: "20px",
                                color:
                                  router.asPath === "/UserOrders"
                                    ? "#FF5E14"
                                    : "#00235A",
                              }}
                            />
                            <span className="ml-2">
                              {username !== "" ? (
                                <span
                                  style={{
                                    color:
                                      router.asPath === "/UserOrders"
                                        ? "#FF5E14"
                                        : "#00235A",
                                  }}
                                >
                                  {username}
                                </span>
                              ) : (
                                ""
                              )}
                            </span>
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
              <li>
                <Link href="/Cart" onMouseEnter={cartlink}>
                  <a className="item font-medium tracking-wide  transition-colors duration-200 hover:text-teal-accent-400">
                    <StyledBadge
                      badgeContent={cartItems.reduce(
                        (a, c) => a + Number(c.qty),
                        0
                      )}
                      color="secondary"
                    >
                      {/* <FontAwesomeIcon
                        icon={faShoppingBasket}
                        style={{
                          fontSize: "28px",
                          color:
                            router.asPath === "/Cart" ? "#FF5E14" : "#00235A",
                        }}
                      /> */}
                      <ShoppingCartOutlinedIcon
                        style={{
                          fontSize: "24px",
                          color:
                            router.asPath === "/Cart" ? "#FF5E14" : "#00235A",
                        }}
                      />
                    </StyledBadge>
                  </a>
                </Link>
              </li>
              {role == "Seller" && (
                <Link href="/Seller/SellerDash">
                  <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
                    Seller Dashboard
                  </button>
                </Link>
              )}
              {log && (
                <>
                  {role == "Builder" && (
                    <>
                      <li
                        onClick={() => {
                          UserServices.logout();
                        }}
                      >
                        <Link href="/">
                          <a className="item font-medium tracking-wide  transition-colors duration-200 hover:text-teal-accent-400">
                            <span className="ml-2">Logout</span>
                          </a>
                        </Link>
                      </li>
                      <Link href="/BuilderDash">
                        <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
                          Builder Dashboard
                        </button>
                      </Link>
                    </>
                  )}{" "}
                </>
              )}
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
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Store
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
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

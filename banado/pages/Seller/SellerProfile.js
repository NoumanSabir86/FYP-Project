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
const SellerProfile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("Architecture");
  const [address, setAddress] = useState("");
  const [shopName, setShopName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");

  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(async () => {
    const data = UserServices.getLoggedinfo();

    setName(data.username);
    setEmail(data.email);
    setAddress(data.shopAddress);
    setShopName(data.shopName);
    setSellerPhone(data.sellerPhone);

    setId(data._id);
  }, []);

  const notify = (error, type) => {
    toast.notify(error, {
      duration: 5,
      type: type,
      title: type,
    });
  };

  const updateData = async () => {
    await axios
      .put("http://localhost:3001/api/users/update/" + id, {
        username: name,
        sellerPhone: sellerPhone,
        shopName: shopName,
        shopAddress: address,
        password: password,
      })
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
          <p className="heading4 ml-20 mt-14 text-bold uppercase">Profile</p>
          <ToastContainer />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
          <div>
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter Name"
            />
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Stock Quantity"
            />

            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Shop Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Price"
            />
          </div>
          <div>
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Shop Name
            </label>
            <input
              onChange={(e) => setShopName(e.target.value)}
              value={shopName}
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter Brand"
            />
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Phone Number
            </label>
            <input
              onChange={(e) => setSellerPhone(e.target.value)}
              value={sellerPhone}
              type="text"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter Brand"
            />
            <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Blank to keep Current Password "
            />
          </div>

          <div>
            {" "}
            <button
              onClick={() => {
                updateData();
              }}
              className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// export const getStaticProps = async () => {

//   const data = UserServices.getLoggedinfo();

//   return { props: { data } };
// };

export default SellerProfile;

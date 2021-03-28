import Link from "next/link";
import React from "react";
import { SellerNav } from "../../Components/Accounts/SellerNav";
const UpdateProduct = () => {
  return (
    <div>
      <SellerNav />
      <div>
        <p className="heading4 ml-20 mt-14 text-bold uppercase">Edit Product</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
        <div>
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Product Name
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter Name"
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Stock Quantity
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Stock Quantity"
          />

          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Price
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Price"
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Sale Price
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Sale Price"
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            SKU
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="SKU"
          />
        </div>
        <div>
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            <span class="text-gray-700">Category</span>
            <select class="form-select  block w-full rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
              <option>Architecture</option>
              <option>Interior Design</option>
              <option>Electronics</option>
              <option>Other</option>
            </select>
          </label>

          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Brand Name
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter Brand"
          />
        </div>

        <div className="col-span-full">
          <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
            Short description
          </label>
          <textarea
            class="col-span-full appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter Short Description"
            name="comment"
            rows="2"
            cols="40"
          ></textarea>
        </div>

        <div className="col-span-full">
          <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
            Description
          </label>
          <textarea
            class="col-span-full appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Description"
            name="comment"
            rows="5"
            cols="40"
          ></textarea>
        </div>
        <div>
          {" "}
          <Link href="/Seller/CreateProduct">
            <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

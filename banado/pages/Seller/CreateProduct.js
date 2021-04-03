import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SellerNav } from "../../Components/Accounts/SellerNav";
import addNewProduct from "../../redux/actions/addNewProduct";
import UserServices from "../../Services/UserServices";
import SimpleModal from "../../Components/SimpleModal";
import { ToastContainer, toast } from "react-nextjs-toast";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [brandName, setBrandName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [sku, setSku] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const Product = useSelector((state) => state.addProduct);
  const { loading, success, error } = Product;
  const [showDialogue, setShowDialogue] = React.useState(false);

  const [productImage, setProductImage] = useState(
    "https://p4.design/assets/Products/Bla-Station/Wilmer-O55S/Wilmer-055S-1.png"
  );
  const [storeId, setStoreId] = useState("");

  React.useEffect(() => {
    setStoreId(UserServices.getLoggedinfo().sellerId);
  }, []);

  const checkStatus = () => {
    if (success == true) {
      setOpen(true);
    }
  };
  const dispatch = useDispatch();
  const addProductHandler = () => {
    dispatch(
      addNewProduct({
        productName,
        category,
        brandName,
        stockQuantity,
        price,
        salePrice,
        sku,
        shortDescription,
        description,
        productImage,
        storeId,
      })
    );
  };

  return (
    <div>
      <SellerNav />
      <ToastContainer align={"center"} position={"bottom"} />

      <div>
        <p className="heading4 ml-20 mt-14 text-bold uppercase">
          Add New Product
        </p>
        <SimpleModal
          open={open}
          title="Record Status"
          text="Product added successfully!"
          address="/Seller/CreateProduct"
        />
        ;
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
            onChange={(e) => setProductName(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Stock Quantity
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Stock Quantity"
            onChange={(e) => setStockQuantity(e.target.value)}
          />

          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Price
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Sale Price
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Sale Price"
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            SKU
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="SKU"
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div>
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            <span class="text-gray-700">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              class="form-select  block w-full rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="Architecture">Architecture</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Brand Name
          </label>
          <input
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter Brand"
            onChange={(e) => setBrandName(e.target.value)}
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
            onChange={(e) => setShortDescription(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <Link href="/Seller/CreateProduct">
            <button
              onClick={() => {
                addProductHandler();
                setShowDialogue(success);

                if (showDialogue == true) {
                  checkStatus();
                }
              }}
              className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

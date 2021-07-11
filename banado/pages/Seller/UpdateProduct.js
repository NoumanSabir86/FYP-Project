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
const UpdateProduct = () => {
  const pDetails = useSelector((state) => state.getProductDetails);
  const [progress, setProgress] = useState(0);
  const [productImage, setProductImage] = useState("");

  const [storeId, setStoreID] = useState("");

  const { product, loading, error } = pDetails;

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [brandName, setBrandName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [sku, setSku] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [URL, setURL] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(async () => {
    await axios
      .get(
        "http://localhost:3001/api/products/" +
          localStorage.getItem("productID")
      )
      .then((res) => {
        setProductName(res.data.productName);
        setPrice(res.data.price);
        setSalePrice(res.data.salePrice);
        setCategory(res.data.category);
        setBrandName(res.data.brandName);
        setShortDescription(res.data.shortDescription);
        setDescription(res.data.description);

        setSku(res.data.sku);
        setStockQuantity(res.data.stockQuantity);
        setStoreID(res.data.storeId);
      });

    dispatch(getProductDetails(localStorage.getItem("productID")));
  }, [router.query]);

  const uploadImage = () => {
    let uploadTask = storage
      .ref(`productImages/${productImage.name}`)
      .put(productImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("productImages")
          .child(productImage.name)
          .getDownloadURL()
          .then((url) => {
            setProductImage(url);
            setURL(url);
          });
      }
    );
  };

  const notify = (error, type) => {
    toast.notify(error, {
      duration: 2,
      type: type,
      title: type,
    });
  };

  const updateProductHandler = () => {
    if (URL == "") {
      productServices
        .updateProduct(localStorage.getItem("productID"), {
          productName,
          category,
          brandName,
          stockQuantity,
          price,
          salePrice,
          sku,
          shortDescription,
          description,
          productImage: product.productImage,
          storeId,
        })
        .then((res) => {
          notify("Product Updated Successfully!", "success");
          setTimeout(() => {
            window.location.href = "/Seller/UpdateProduct";
          }, 2000);
        })
        .catch((err) => {
          notify(err.response.data, "error");
        });
    } else {
      setProductImage(URL);
      productServices
        .updateProduct(localStorage.getItem("productID"), {
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
        .then((res) => {
          notify("Product Updated Successfully!", "success");
          setTimeout(() => {
            window.location.href = "/Seller/UpdateProduct";
          }, 2000);
        })
        .catch((err) => {
          notify(err.response.data, "error");
        });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <span>There was some error!</span>
      ) : (
        <div>
          <SellerNav />
          <div>
            <p className="heading4 ml-20 mt-14 text-bold uppercase">
              Edit Product
            </p>
            <ToastContainer />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
            <div>
              <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
                Product Name
              </label>
              <input
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                type="text"
                class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter Name"
              />
              <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
                Stock Quantity
              </label>
              <input
                onChange={(e) => setStockQuantity(e.target.value)}
                value={stockQuantity}
                type="text"
                class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Stock Quantity"
              />

              <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text"
                class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Price"
              />
              <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
                Sale Price
              </label>
              <input
                onChange={(e) => setSalePrice(e.target.value)}
                value={salePrice}
                type="text"
                class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Sale Price"
              />
              <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
                SKU
              </label>
              <input
                onChange={(e) => setSku(e.target.value)}
                value={sku}
                type="text"
                class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="SKU"
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
                onChange={(e) => setBrandName(e.target.value)}
                value={brandName}
                type="text"
                class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter Brand"
              />
              <ProgressBar
                completed={progress}
                bgColor="#00235A"
                height="10px"
                borderRadius="10px"
                isLabelVisible={false}
              />
              <input
                type="file"
                className="hoverBtn rounded  pr-4 py-2 mt-4 mb-4 "
                onChange={(e) => {
                  setProductImage(e.target.files[0]);
                }}
              ></input>{" "}
              <button
                className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
                onClick={() => {
                  uploadImage();
                }}
              >
                Upload Image
              </button>
              <img
                src={
                  URL == ""
                    ? product.productImage
                    : URL || "http://via.placeholder.com/150"
                }
                class="w-40 rounded"
                alt="Thumbnail"
              ></img>
            </div>

            <div className="col-span-full">
              <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
                Short description
              </label>
              <textarea
                onChange={(e) => setShortDescription(e.target.value)}
                value={shortDescription}
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
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                class="col-span-full appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Description"
                name="comment"
                rows="5"
                cols="40"
              ></textarea>
            </div>
            <div>
              {" "}
              <button
                onClick={() => {
                  updateProductHandler();
                }}
                className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;

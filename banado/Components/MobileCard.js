import Cookies from "js-cookie";
import Link from "next/link";
import router from "next/router";
import React from "react";

const MobileCard = ({ product }) => {
  return (
    <div className="container">
      <Link href={`/SingleProduct/${product._id}`}>
        <img
          onClick={() => {
            router.push(
              `/SingleProduct/${product._id}`,
              `/SingleProduct/${product._id}`,
              {
                shallow: true,
              }
            );
            localStorage.setItem("productID", product._id);
            Cookies.set("p_id", product._id);
          }}
          className="w-24"
          src={product.productImage}
        ></img>
      </Link>
      <p className="stext">
        {product.productName.length > 15
          ? product.productName.substring(0, 15 - 3) + "..."
          : product.productName}
      </p>
    </div>
  );
};

export default MobileCard;

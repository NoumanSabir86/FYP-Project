import React from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const SmallCard = ({ product }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="hover:cursor-pointer"
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
      >
        <Link
          href={`/SingleProduct/${product._id}`}
          className="hover:cursor-pointer"
        >
          <div>
            <div
              className="flex flex-row mt-4 "
              style={{ height: "50px", position: "relative" }}
            >
              <div>
                {" "}
                <img
                  src={product.productImage}
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "2px solid #F0F0F0",
                    padding: "1px",
                  }}
                />
              </div>
              <div
                className=" "
                style={{
                  border: "2px  solid #F0F0F0",
                  borderLeft: "0px",
                  width: "250px",
                }}
              >
                <div className="flex flex-row pl-4 pr-4">
                  <div className="flex flex-col">
                    <span className="heading4" style={{ fontSize: "18px" }}>
                      {product.productName.length > 20
                        ? product.productName.substring(0, 20 - 3) + "..."
                        : product.productName}
                    </span>
                    <span className="heading4" style={{ fontSize: "12px" }}>
                      Rs.{product.salePrice}
                    </span>
                  </div>
                  {/* <div style={{ position: "absolute", right: "5%" }}>
              <ReactStars
                count={5}
                size={18}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                value="5"
                activeColor="#FF5E14"
              />
            </div> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SmallCard;

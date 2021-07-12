import React from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const ServiceCard = ({ builder }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          Cookies.set("sid", builder.builderId);
          window.location.href = `/Builder/${builder.builderId}`;
        }}
      >
        <div>
          <div
            className="flex flex-row mt-4 "
            style={{ height: "50px", position: "relative" }}
          >
            <div>
              {" "}
              <img
                src={builder.logo}
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
                    {builder.companyName.length > 20
                      ? builder.companyName.substring(0, 20 - 3) + "..."
                      : builder.companyName}
                  </span>
                  <span className="heading4" style={{ fontSize: "12px" }}>
                    {builder.location}
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
      </div>
    </>
  );
};

export default ServiceCard;

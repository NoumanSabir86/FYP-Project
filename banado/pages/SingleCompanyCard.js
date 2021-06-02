import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";
const SingleCompanyCard = ({ record }) => {
  let logo = record.logo;

  return (
    <div
      onClick={() => {
        Cookies.set("sid", record.builderId);
        window.location.href = `/Builder/${record.builderId}`;
      }}
    >
      <div class="flex shadow-lg w-full h-40  bg-white cursor-pointer hover:shadow-2xl transition-all overflow-hidden">
        <div
          class="w-1/6  bg-cover   overflow-hidden "
          style={{
            background: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center center",
          }}
        ></div>
        <div
          class="w-5/6 shadow p-4"
          // style={{ border: "1px solid #A6A6A6", borderLeft: "0" }}
        >
          <h1 class="text-gray-900 heading4 font-bold text-2xl">
            {record.companyName}
          </h1>
          <p
            class="mt-2 text-gray-600 mytext  text-sm"
            style={{ lineHeight: "1.4rem" }}
          >
            {record.aboutCompany.length > 200
              ? record.aboutCompany.substring(0, 200 - 3) + "..."
              : record.aboutCompany}
          </p>
          <div class="flex item-center mt-2">
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              value="5"
              activeColor="#FF5E14"
            />
          </div>
          <div class="flex item-center justify-between mt-3">
            <h1 class="text-gray-700 font-bold text-xl "></h1>
            <button
              // onClick={() => {
              //   Cookies.set("sid", record._id);
              //   console.log(record);
              // }}
              style={{ backgroundColor: "#FF5E14" }}
              class="px-3 py-2 transform  text-white text-xs font-bold uppercase rounded mb-4 -mt-12"
            >
              See more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyCard;

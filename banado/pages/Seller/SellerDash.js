import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import InfoCard from "../../Components/Accounts/InfoCard";
import { SellerNav } from "../../Components/Accounts/SellerNav";
import getStoreProducts from "../../redux/actions/getStoreProducts";
import UserServices from "../../Services/UserServices";

const SellerDash = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getStoreProducts(UserServices.getLoggedinfo().sellerId));
  }, []);

  return (
    <div>
      <SellerNav />
      <div
        style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-5">
          <InfoCard title="Total Products" num="200" />
          <InfoCard title="Sales" num="150" />
          <InfoCard title="Total Earnings" num="Rs.102,234" />
          <InfoCard title="Profit" num="20,000" />
          <InfoCard title="Total Orders" num="150" />
          <InfoCard title="Completed Orders" num="101" />
          <InfoCard title="In-Progress" num="45" />
          <InfoCard title="Canceled Orders" num="5" />
        </div>
      </div>
    </div>
  );
};

export default SellerDash;

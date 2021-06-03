import React from "react";
import { AdminNav } from "../Components/Accounts/AdminNav";
import InfoCard from "../Components/Accounts/InfoCard";

const AdminDash = () => {
  return (
    <>
      <AdminNav />
      <div className="px-32 mt-12">
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
    </>
  );
};

export default AdminDash;

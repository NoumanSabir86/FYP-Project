import axios from "axios";
import React from "react";
import { AdminNav } from "../Components/Accounts/AdminNav";
import InfoCard from "../Components/Accounts/InfoCard";
import cookie from "cookie";
const AdminDash = (props) => {
  console.log(props);

  return (
    <>
      <AdminNav />
      <div className="px-32 mt-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-5">
          <InfoCard title="Total Products" num={props.products.length} />
          <InfoCard title="Sales" num={props.completedOrders} />
          <InfoCard title="Total Earnings" num={props.totalEarning} />
          <InfoCard title="Expected Earnings" num={props.expectedEarning} />

          <InfoCard title="Total Orders" num={props.orders.length} />
          <InfoCard title="Completed Orders" num={props.completedOrders} />
          <InfoCard title="In-Progress" num={props.processingOrders} />
          <InfoCard title="Canceled Orders" num={props.canceledOrders} />

          <InfoCard title="Total Users" num={props.users.length} />
          <InfoCard title="Total Vendors" num={props.vendors.length} />
          <InfoCard title="Total Companies" num={props.builders.length} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    const data1 = await axios.get("http://localhost:3001/api/products/");

    const data2 = await axios.get("http://localhost:3001/api/order/");

    const data3 = await axios.get("http://localhost:3001/api/users/");
    const data4 = await axios.get("http://localhost:3001/api/users/vendors");
    const data5 = await axios.get("http://localhost:3001/api/users/builders");

    const products = data1.data.products;
    const orders = data2.data;
    const users = data3.data;
    const vendors = data4.data;
    const builders = data5.data;

    let completedOrders = 0,
      canceledOrders = 0,
      processingOrders = 0;
    let totalEarning = 0,
      expectedEarning = 0;

    orders.map((item, index) => {
      item.status == "Cancelled"
        ? canceledOrders++
        : item.status == "Processing"
        ? processingOrders++
        : completedOrders++;

      item.status == "Cancelled"
        ? ""
        : item.status == "Processing"
        ? (expectedEarning += item.total)
        : (totalEarning += item.total);
    });

    return {
      props: {
        products,
        orders,
        canceledOrders,
        completedOrders,
        processingOrders,
        totalEarning,
        expectedEarning,
        users,
        vendors,
        builders,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default AdminDash;

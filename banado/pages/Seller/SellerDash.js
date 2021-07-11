import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import InfoCard from "../../Components/Accounts/InfoCard";
import { SellerNav } from "../../Components/Accounts/SellerNav";
import getStoreProducts from "../../redux/actions/getStoreProducts";
import UserServices from "../../Services/UserServices";
import cookie from "cookie";
import axios from "axios";
const SellerDash = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // dispatch(getStoreProducts(UserServices.getLoggedinfo()._id));
  }, []);

  console.log(props);

  return (
    <div>
      <SellerNav />
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-5">
          <InfoCard title="Total Products" num={props.products.length} />
          <InfoCard title="Sales" num={props.completedOrders} />
          <InfoCard title="Total Earnings(Rs)" num={props.totalEarning} />
          <InfoCard title="Expected Earning" num={props.expectedEarning} />
          <InfoCard title="Total Orders" num={props.orders.length} />
          <InfoCard title="Completed Orders" num={props.completedOrders} />
          <InfoCard title="In-Progress" num={props.processingOrders} />
          <InfoCard title="Canceled Orders" num={props.canceledOrders} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    const data1 = await axios.get(
      "http://localhost:3001/api/products/byStore/" + parsedCookies.SellerID
    );

    const data2 = await axios.get(
      "http://localhost:3001/api/order/byStore/" + parsedCookies.SellerID
    );

    const products = data1.data;
    const orders = data2.data;
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
      },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default SellerDash;

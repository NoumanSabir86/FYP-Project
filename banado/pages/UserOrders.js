import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import cookie from "cookie";
import Link from "next/link";
import React from "react";
import { SellerNav } from "../Components/Accounts/SellerNav";
import { Navbar } from "../Components/Navbar";
import EnhancedTable from "../Components/Table/EnhancedTable";
import UserServices from "../Services/UserServices";

const UserOrders = (props) => {
  const [data, setData] = React.useState(
    props.orders || [
      {
        products: [],
        orderDate: "",
        orderNumber: "",
        status: "",
        storeId: "",
        total: 0,
        userId: "",
        _id: "",
      },
    ]
  );
  const [status, setStatus] = React.useState("");

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Order Number",
        accessor: "orderNumber",

        Cell: ({ row }) => <>{row.original.orderNumber}</>,
      },

      {
        Header: "Products",
        accessor: "products",
        Cell: ({ row }) => (
          <>
            {row.values.products.map((i, index) => {
              return <span key={index}>{i.productName},</span>;
            })}
          </>
        ),
      },

      {
        Header: "Total Amount",
        accessor: "total",
        show: false,
      },

      {
        Header: "Date Created",
        accessor: "orderDate",
        Cell: ({ row }) => <>{row.original.orderDate}</>,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => <>{row.original.status}</>,
      },
    ],
    []
  );

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <>
      <div>
        <Navbar />

        <div className="flex items-center justify-center flex-row pl-8 pr-8">
          <div className="mt-10">
            <Link href="/UserProfile" style={{ float: "right" }}>
              <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
                My Profile
              </button>
            </Link>
            <h1 className="heading4 ">Orders</h1>

            <CssBaseline />
            <EnhancedTable
              columns={columns}
              data={data}
              setData={setData}
              updateMyData={updateMyData}
              skipPageReset={skipPageReset}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie);

  const data1 = await axios.get(
    "http://localhost:3001/api/order/byUser/" + parsedCookies.id
  );
  const orders = data1.data;
  let names;
  let subitems;

  orders.map((i) => {
    subitems = i.products;
  });

  subitems.map((i, index) => {
    names = i.productName;
  });

  return { props: { orders, names } };
};

export default UserOrders;

import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import cookie from "cookie";
import Link from "next/link";
import React from "react";
import { SellerNav } from "../Components/Accounts/SellerNav";
import EnhancedTable from "../Components/Table/EnhancedTable";

const SellerOrders = (props) => {
  const [data, setData] = React.useState(props.orders ? props.orders : "");
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
        Cell: ({ row }) => (
          <>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                row.values.Status = e.target.value;
              }}
              class="form-select  block w-full rounded-lg   border-transparent flex-1  border border-gray-300  py-2  bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </>
        ),
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
        <SellerNav />
        <h1 className="heading4 mt-10 ml-20 mr-20">Order Management</h1>

        <div className="flex items-center justify-center flex-row pl-8 pr-8">
          <div className="">
            <CssBaseline />
            {props.orders ? (
              <EnhancedTable
                columns={columns}
                data={data}
                setData={setData}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
              />
            ) : (
              "Nothing to Show"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    const data1 = await axios.get(
      "http://localhost:3001/api/order/byStore/" + parsedCookies.id
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
  } catch (error) {
    return { props: {} };
  }
};

export default SellerOrders;

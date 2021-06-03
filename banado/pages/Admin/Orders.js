import { CssBaseline } from "@material-ui/core";
import axios from "axios";

import cookie from "cookie";
import Link from "next/link";
import React from "react";
import { AdminNav } from "../../Components/Accounts/AdminNav";
import EnhancedTable from "../../Components/Table/EnhancedTable";

const Orders = (props) => {
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
      <AdminNav />
      <div className="flex  flex-col pl-24 mt-5">
        <div>
          <h1 className="heading4 " style={{ fontSize: "40px" }}>
            Orders
          </h1>
        </div>
      </div>
      <div className=" ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
        <div>
          <div className="flex items-center justify-center flex-row pl-8 pr-8">
            <div>
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
                "No Data to Show"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const data1 = await axios.get("http://localhost:3001/api/order/");
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

export default Orders;

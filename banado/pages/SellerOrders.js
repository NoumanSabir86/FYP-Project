import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import cookie from "js-cookie";
import Link from "next/link";
import React from "react";
import { SellerNav } from "../Components/Accounts/SellerNav";
import EnhancedTable from "../Components/Table/EnhancedTable";

const SellerOrders = (props) => {
  const [data, setData] = React.useState(props.orders);
  console.log(props);

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Customer ID",
        accessor: "userId",
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
        Header: "Status",
        accessor: "status",
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          <>
            <select
              value="Processing"
              // onChange={(e) => setCategory(e.target.value)}
              class="form-select  block w-full rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300  py-2 px-12 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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

        <div className="flex items-center justify-center flex-row pl-20 pr-20">
          <div className="mt-10">
            <h1 className="heading4 ">Order Management</h1>

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

export const getServerSideProps = async () => {
  const data1 = await axios.get(
    "http://localhost:3001/api/order/byStore/60961fff4de58a00e41bb101"
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

export default SellerOrders;

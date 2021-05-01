import { Button, CssBaseline } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { SellerNav } from "../../Components/Accounts/SellerNav";

import EnhancedTable from "../../Components/Table/EnhancedTable";
import makeData from "../../Components/Table/makeData";

const ProductManagement = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        accessor: "product",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Selling Price",
        accessor: "sellPrice",
      },

      {
        Header: "Action",
        accessor: "action",
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <Button>Edit</Button>
        ),
        // We can override the cell renderer with a SubCell to be used with an expanded row
        SubCell: () => null, // No expander on an expanded row
      },
    ],
    []
  );

  const [data, setData] = React.useState(
    React.useMemo(
      () => makeData(20),

      []
    )
  );
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
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
    <div>
      <SellerNav />

      <div className="flex items-center justify-center flex-row pl-20 pr-20">
        <div className="mt-10">
          <h1 className="heading4 ">Product Management</h1>
          <Link href="/Seller/CreateProduct">
            <button className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 ">
              Add New Product
            </button>
          </Link>
          <CssBaseline />
          <EnhancedTable
            columns={columns}
            data={data}
            setData={setData}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductManagement;

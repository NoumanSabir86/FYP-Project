import axios from "axios";
import cookie from "js-cookie";
import Link from "next/link";
import React from "react";
import EnhancedTable from "../Components/Table/EnhancedTable";

const SellerOrders = (props) => {
  const [data, setData] = React.useState(props.orders);

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Products",
        accessor: "products",
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
            <div className="flex flex-row">
              <div>
                <a
                  onClick={() => {
                    // handleRemove(row.original._id);
                  }}
                >
                  ds
                </a>
              </div>
            </div>
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
    <div>
      {console.log(props.orders)}

      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <p>Hello</p>
    </div>
  );
};

export const getServerSideProps = async () => {
  const data1 = await axios.get(
    "http://localhost:3001/api/order/byStore/60961fff4de58a00e41bb101"
  );
  const orders = data1.data;

  return { props: { orders } };
};

export default SellerOrders;

import { Button, CssBaseline } from "@material-ui/core";
import axios from "axios";

import cookie from "cookie";
import Link from "next/link";
import React from "react";
import { AdminNav } from "../../Components/Accounts/AdminNav";
import EnhancedTable from "../../Components/Table/EnhancedTable";

const Vendors = (props) => {
  const [data, setData] = React.useState(props.seller ? props.seller : "");
  const [status, setStatus] = React.useState("");

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Seller Name",
        accessor: "name",

        Cell: ({ row }) => {
          return row.original.details.map((i) => {
            return i.name;
          });
        },
      },

      {
        Header: "Store Name",
        accessor: "storeName",

        Cell: ({ row }) => {
          return row.original.storeName;
        },
      },

      {
        Header: "Email",
        accessor: "email",

        Cell: ({ row }) => {
          return row.original.details.map((i) => {
            return i.email;
          });
        },
      },

      {
        Header: "Address",
        accessor: "address",

        Cell: ({ row }) => {
          return row.original.shopAddress;
        },
      },
      {
        Header: "Phone No.",
        accessor: "phoneNumber",

        Cell: ({ row }) => {
          return row.original.sellerPhone;
        },
      },
      {
        Header: "Action",

        Cell: ({ row }) => {
          return (
            <button
              onClick={async () => {
                await axios
                  .delete(
                    "https://server-banado.herokuapp.com/api/users/deleteVendor/" +
                      row.original.sellerId
                  )
                  .then((res) => {
                    alert("Vendor Deleted Successfully!");
                  })
                  .catch((err) => {
                    alert(err.response.data);
                  });
              }}
            >
              Delete
            </button>
          );
        },
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
            Vendors Management
          </h1>
        </div>
      </div>
      <div className=" ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
        <div>
          <div className="flex items-center justify-center flex-row pl-8 pr-8">
            <div>
              <CssBaseline />
              {props.seller ? (
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
    var data1 = await axios.get(
      "https://server-banado.herokuapp.com/api/users/vendors"
    );

    return { props: { seller: data1.data } };
  } catch (error) {
    return { props: {} };
  }
};

export default Vendors;

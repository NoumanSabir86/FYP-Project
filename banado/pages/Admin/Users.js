import { Button, CssBaseline } from "@material-ui/core";
import axios from "axios";

import cookie from "cookie";
import Link from "next/link";
import React from "react";
import { AdminNav } from "../../Components/Accounts/AdminNav";
import EnhancedTable from "../../Components/Table/EnhancedTable";

const Users = (props) => {
  const [data, setData] = React.useState(props.users ? props.users : "");
  const [status, setStatus] = React.useState("");

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  React.useEffect(async () => {
    console.log(props.users);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "id",
        Cell: ({ row }) => {
          return row.original._id;
        },
      },

      {
        Header: "User Name",
        accessor: "name",
      },

      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Role",
        accessor: "role",
      },

      {
        Header: "Action",

        Cell: ({ row }) => {
          return row.original.role == "Admin" ? (
            ""
          ) : (
            <button
              onClick={async () => {
                console.log(row);
                await axios
                  .delete(
                    "http://localhost:3001/api/users/deleteVendor/" +
                      row.original._id
                  )
                  .then((res) => {
                    alert("Record Deleted Successfully!");
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
            Users Management
          </h1>
        </div>
      </div>
      <div className=" ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
        <div>
          <div className="flex items-center justify-center flex-row pl-8 pr-8">
            <div>
              <CssBaseline />
              {props.users ? (
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
    var data1 = await axios.get("http://localhost:3001/api/users/");

    return { props: { users: data1.data } };
  } catch (error) {
    return { props: {} };
  }
};

export default Users;

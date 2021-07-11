import { Button, CssBaseline } from "@material-ui/core";
import Link from "next/link";
import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SellerNav } from "../../Components/Accounts/SellerNav";
import Loader from "../../Components/Loader";
import EnhancedTable from "../../Components/Table/EnhancedTable";
import makeData from "../../Components/Table/makeData";
import getProductList from "../../redux/actions/getProductList";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import getStoreProducts from "../../redux/actions/getStoreProducts";
import UserServices from "../../Services/UserServices";
import deleteProduct from "../../redux/actions/deleteProduct";
import axios from "axios";
import cookie from "cookie";
import { useRouter } from "next/router";
const ProductManagement = (props) => {
  const pList = useSelector((state) => state.storeProducts);
  const { products, loading, error } = pList;
  const deletedProduct = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = deletedProduct;
  const router = useRouter();
  const [data, setData] = React.useState(props.products);

  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(deleteProduct(id));
    alert("Product deleted Successfully!");
    window.location.href = "/Seller/SellerDash";
  };

  React.useEffect(async () => {
    setData(props.products);
  }, [successDelete]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ProductID",
        accessor: "_id",
        show: false,
      },
      {
        Header: "Product",
        accessor: "productName",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Brand",
        accessor: "brandName",
      },
      {
        Header: "Stock",
        accessor: "stockQuantity",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Selling Price",
        accessor: "salePrice",
      },

      {
        Header: "Action",
        accessor: "action",
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          <>
            <div className="flex flex-row">
              <div>
                <a
                  onClick={() => {
                    handleRemove(row.original._id);
                  }}
                >
                  <DeleteIcon className=" hover:text-red-600 cursor-pointer" />
                </a>
              </div>
              <div>
                <Link
                  href="/Seller/UpdateProduct"
                  className="edit"
                  style={{ marginLeft: ".5rem" }}
                >
                  <EditIcon
                    onClick={() => {
                      router.push(
                        `/Seller/UpdateProduct`,
                        `/Seller/UpdateProduct/${row.original._id}`,
                        {
                          shallow: true,
                        }
                      );
                      localStorage.setItem("productID", row.original._id);
                    }}
                    className=" hover:text-blue-600 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </>
        ),
      },
    ],
    []
  );

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

    const products = data1.data;

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default ProductManagement;

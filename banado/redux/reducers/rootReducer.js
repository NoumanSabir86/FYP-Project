import { combineReducers } from "redux";
import addNewProductReducer from "./addNewProduct.reducer";
import cartReducer from "./addToCart.reducer";
import deleteProductReducer from "./deleteProduct.reducer";
import { productDetailsReducer } from "./getProductDetails.reducer";
import { productListReducer } from "./getProductList.reducer";
import { getStoreProducts } from "./getStoreProductReducer";

const rootReducer = combineReducers({
  addProduct: addNewProductReducer,
  getProductList: productListReducer,
  getProductDetails: productDetailsReducer,
  deleteProduct: deleteProductReducer,
  cart: cartReducer,
  storeProducts: getStoreProducts,
});

export default rootReducer;

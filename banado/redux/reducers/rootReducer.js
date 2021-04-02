import { combineReducers } from "redux";
import addNewProductReducer from "./addNewProduct.reducer";
import cartReducer from "./addToCart.reducer";
import deleteProductReducer from "./deleteProduct.reducer";
import { productDetailsReducer } from "./getProductDetails.reducer";
import { productListReducer } from "./getProductList.reducer";

const rootReducer = combineReducers({
  addProduct: addNewProductReducer,
  getProductList: productListReducer,
  getProductDetails: productDetailsReducer,
  deleteProduct: deleteProductReducer,
  cart: cartReducer,
});

export default rootReducer;

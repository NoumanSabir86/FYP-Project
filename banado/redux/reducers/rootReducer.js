import { combineReducers } from "redux";
import addNewProductReducer from "./addNewProduct.reducer";
import main from "./main";

const rootReducer = combineReducers({
  main: main,
  addProduct: addNewProductReducer,
});

export default rootReducer;

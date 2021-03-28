import GenericServices from "./GenericServices";

class StoreService extends GenericServices {
  constructor() {
    super();
  }
  createStore = (data) => this.post("store", data);
    StorePresent = (data) => this.post("store/storePresent", data);
}  

const storeServices = new StoreService();
export default storeServices;

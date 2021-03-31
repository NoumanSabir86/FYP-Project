import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/api/";

const setHeader = () => {
  let token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    axios.defaults.headers.common["x-auth-token"] = null;
    /*if setting null does not remove `Authorization` header then try     
           delete axios.defaults.headers.common['Authorization'];
         */
  }
};
class GenericServices {
  componentDidMount() {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
  }

  get = (url) =>
    new Promise((resolve, reject) => {
      setHeader();
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  post = (url, data) =>
    new Promise((resolve, reject) => {
      setHeader();
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  delete = (url) =>
    new Promise((resolve, reject) => {
      setHeader();
      axios
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

export default GenericServices;

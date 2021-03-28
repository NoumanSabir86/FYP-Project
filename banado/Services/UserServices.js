import GenericServices from "./GenericServices";
import jwt_decode from "jwt-decode";
class userServices extends GenericServices {
  login = (data) =>
    new Promise((resolve, reject) => {
      this.post("users/login", data)
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });

  register = (data) =>
    new Promise((resolve, reject) => {
      this.post("users/register", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  isLoggedin = () => {
    try {
      return localStorage.getItem("token") ? true : false;
    } catch (error) {}
  };

  logout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {}
  };

  componentDidMount() {
    this.isLoggedin();
    this.logout();
    this.getLoggedinfo();
  }

  getLoggedinfo = () => {
    try {
      let jwt = localStorage.getItem("token");
      console.log(jwt);
      var decode = jwt_decode(jwt);

      return decode;
    } catch (error) {
      console.log(error);
    }
  };
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedinfo().role === "admin") return true;
      else return false;
    } else return false;
  };
}

let UserServices = new userServices();
export default UserServices;

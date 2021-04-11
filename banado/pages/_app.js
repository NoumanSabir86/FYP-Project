import "../styles/globals.css";
import "../styles/utils.css";
import { wrapper } from "../redux/store";
import "@fortawesome/fontawesome-free/css/all.css";
import { Navbar } from "../Components/Navbar";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  <Navbar />;
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);

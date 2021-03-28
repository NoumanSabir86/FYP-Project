import "../styles/globals.css";
import "../styles/utils.css";
import { wrapper } from "../redux/store";

import "@fortawesome/fontawesome-free/css/all.css";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);

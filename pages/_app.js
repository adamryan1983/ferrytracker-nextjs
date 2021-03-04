import "../styles/globals.css";
import PrimeReact from "primereact/api";
import { HarperDBProvider } from "use-harperdb";

function MyApp({ Component, pageProps }) {
  // active ripple effect
  PrimeReact.ripple = true;
  <HarperDBProvider
    url={process.env.REACT_APP_DB_URL}
    user={process.env.REACT_APP_USER}
    password={process.env.REACT_APP_PASSWORD}
  ></HarperDBProvider>;
  return <Component {...pageProps} />;
}

export default MyApp;

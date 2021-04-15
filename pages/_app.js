import "@styles/globals.css";
import PrimeReact from "primereact/api";
import { LoginWrapper } from "@context/LoginContext";

function MyApp({ Component, pageProps }) {
  // active ripple effect
  PrimeReact.ripple = true;
  return (
    <LoginWrapper>
      <Component {...pageProps} />
    </LoginWrapper>
  );
}

export default MyApp;

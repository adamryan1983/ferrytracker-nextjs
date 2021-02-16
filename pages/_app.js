import '../styles/globals.css'
import PrimeReact from 'primereact/api';


function MyApp({ Component, pageProps }) {
    // active ripple effect
    PrimeReact.ripple = true;
  return <Component {...pageProps} />
}

export default MyApp

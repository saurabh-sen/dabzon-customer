import "../styles/globals.css";
import { DM_Sans } from 'next/font/google'
import { store } from "../reduxStore/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

const dm_sans = DM_Sans({ 
  weight: '500',
  subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
  }, [router]);

  useEffect(() => {
    // check if cart exists in local storage
    if (localStorage.getItem("cart")) {
      // get cart from local storage
      const cart = JSON.parse(localStorage.getItem("cart"));
      // set cart in redux store
      store.dispatch({
        type: "cartslice/setCartFromLocalStorage",
        payload: cart,
      });
    }
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        <main className={dm_sans.className}>
        {loading ? <Loader /> : <Component {...pageProps} />}

        </main>
      </Provider>
    </SessionProvider>
  );
}

import "../styles/globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";


export default function App({ Component, pageProps }) {
 

  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={"loading"} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

import "../styles/globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { app } from "../src/firebase/firebase";
import { getToken, getMessaging } from "firebase/messaging";

export default function App({ Component, pageProps }) {
  const requestNotifPermission = async () => {
    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey:
          "BOZ5lS6LL3TkU3LI1WcH_S_2Vvo_Fg6FiDo7BUmqylHHZDmSMq6sRNcL-ObBCl6jN3geNd0anA7u_pOf8pP6TD8",
      }).then((token) => {
        if (token) {
          console.log("token");
          console.log(token);
          console.log("token");
        } else {
          console.log("no");
        }
      });
    }

    if (permission === "denied") {
      alert("Anda menolak notifikasi akses");
    }
  };

  useEffect(() => {
    requestNotifPermission();
  }, []);

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

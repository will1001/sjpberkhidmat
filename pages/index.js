import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdPeriode } from "../src/redux/panelReducer";
import HomePage from "./HomePage";
import { app } from "../firebase";
import { getToken, getMessaging } from "firebase/messaging";
import axiosFetch from "../src/API/axiosFetch";
export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const requestNotifPermission = async () => {
    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey:
          "BOZ5lS6LL3TkU3LI1WcH_S_2Vvo_Fg6FiDo7BUmqylHHZDmSMq6sRNcL-ObBCl6jN3geNd0anA7u_pOf8pP6TD8",
      }).then(async (tokenFcm) => {
        if (tokenFcm) {
          console.log(tokenFcm);
          console.log("token");
          console.log("token");
          const a = new FormData();
          a.append("token", tokenFcm);

          {
            await axiosFetch("post", `user/token/save`, a, token);
          }
        } else {
          console.log("no granted");
        }
      });
    }

    if (permission === "denied") {
      alert("Anda menolak notifikasi akses");
    }
  };
  useEffect(() => {
    requestNotifPermission();

    dispatch(
      setIdPeriode({ idPeriode: "6cea57ca-725e-4bbb-84b5-7ccc88f0cd51" })
    );
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
}

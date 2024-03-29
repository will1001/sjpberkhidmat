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
    await Notification.requestPermission();
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

import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIdPeriode } from "../src/redux/panelReducer";
import Admin from "./Admin";
import HomePage from "./HomePage";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
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

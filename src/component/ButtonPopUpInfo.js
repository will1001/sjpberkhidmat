import axios from "axios";
import { object } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../API/useFetch";
import { Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon, TpsIcon } from "../utility/icon/icon";
import JumlahPenduduk from "./JumlahPenduduk";
import NewButton from "./NewButton";
import TabelPopUp from "./petakekuatan/tabel";
import { setButton } from "../redux/button/popUpReducer";

const ButtonPopUpInfo = () => {
  const base_url = "https://api.sjpberkhidmat.id/";
  const kabupaten = useFetch("get", "user/kabupaten");

  const [relawan, setRelawan] = useState([]);

  useEffect(() => {
    axios.get(base_url + "user/relawan").then((res) => setRelawan(res.data));
  }, []);

  const [active, setActive] = useState("");
  const [triger, setTriger] = useState(false);
  const [triger1, setTriger1] = useState(false);

  const buttonName = useSelector((state) => state.button);
  const dispatch = useDispatch();
  const handleButton = (button) => {
    active !== button && setActive(button);

    if (button === "Relawan") {
      setTriger(true);
      dispatch(setButton({ title: "Jumlah Relawan SJP Berkhidmat", button: "Tambah Relawan", name: active, change: triger }));
    } else if (button === "Simpatisan") {
      setTriger(true);
      dispatch(setButton({ title: "Jumlah Simpatisan SJP Berkhidmat", button: "Tambah Simpatisan", name: active, change: triger }));
    } else if (button === "Logistik") {
      setTriger(true);
      dispatch(setButton({ title: "Persebaran Logistik", button: undefined, name: active, change: triger }));
    } else if (button === "Program") {
      setTriger(true);
      dispatch(setButton({ title: "Program SJP Berkhidmat", button: undefined, name: active, change: triger }));
    } else {
      dispatch(setButton({ title: "", button: "", name: "", change: false }));
    }
    // active !== button ?  : setActive("");
    // button == "Relawan" ?  : dispatch(setButton({ title: "", button: "", name: "" }));
    // active === "Simpatisan" ? dispatch(setButton({ title: "Jumlah Simpatisan SJP Berkhidmat", button: "Tambah Simpatisan", name: "Simpatisan" })) : dispatch(setButton({ title: "", button: "", name: "" }));
    // active === "Logistik" ? dispatch(setButton({ title: "Jumlah Simpatisan SJP Berkhidmat", button: "Tambah Simpatisan", name: "Logistik" })) : dispatch(setButton({ title: "", button: "", name: "" }));
    // active === "Program" ? dispatch(setButton({ title: "Jumlah Simpatisan SJP Berkhidmat", button: "Tambah Simpatisan", name: "Program" })) : dispatch(setButton({ title: "", button: "", name: "" }));
  };

  // console.log(active, triger, triger1);
  // console.log(buttonName.button.change);
  const styleBtn = {
    padding: "9px 20px",
    gap: "8px",
    width: "158px",
    height: "35px",
    border: "1px solid #E44700",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "120%",
    textAlign: "center",
    color: "#E44700",
  };

  return (
    <>
      <div className="flex mt-8 justify-between">
        <span id="1" onClick={() => handleButton("Relawan")}>
          <JumlahPenduduk active={active} title={"Relawan"} icon={<RelawanIcon />} total="123.123" h={"55px"} w={"150px"} totalSize={"21px"} titleSize={"18px"} />
        </span>
        <span onClick={() => handleButton("Logistik")}>
          <JumlahPenduduk active={active} title={"Logistik"} icon={<Logistic />} total="123.123" h={"55px"} w={"150px"} totalSize={"21px"} titleSize={"18px"} />
        </span>
      </div>
      <div className="flex gap-2 mt-4">
        <span onClick={() => handleButton("Simpatisan")}>
          <JumlahPenduduk active={active} title={"Simpatisan"} icon={<SimpatisanIcon />} total="123.123" h={"55px"} w={"150px"} totalSize={"21px"} titleSize={"18px"} />
        </span>
        <span onClick={() => handleButton("Program")}>
          <JumlahPenduduk active={active} title={"Program"} icon={<ProgramIcon />} total="123.123" h={"55px"} w={"150px"} totalSize={"21px"} titleSize={"18px"} />
        </span>
      </div>
    </>
  );
};

export default ButtonPopUpInfo;

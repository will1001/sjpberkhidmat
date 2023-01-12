import axios from "axios";
import { object } from "prop-types";
import React, { useEffect, useState } from "react";
import useFetch from "../API/useFetch";
import { Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon, TpsIcon } from "../utility/icon/icon";
import JumlahPenduduk from "./JumlahPenduduk";
import NewButton from "./NewButton";
import TabelPopUp from "./petakekuatan/tabel";

const ButtonPopUpInfo = () => {
  const base_url = "https://api.sjpberkhidmat.id/";
  const kabupaten = useFetch("get", "user/kabupaten");

  const [relawan, setRelawan] = useState([]);

  useEffect(() => {
    axios.get(base_url + "user/relawan").then((res) => setRelawan(res.data));
  }, []);

  const [active, setActive] = useState();
  const [popUp, setPopUp] = useState(false);
  const [tabelTitle, setTabelTitle] = useState({
    title: "",
    text: "",
  });

  const handleButton = (button) => {
    active !== button ? setActive(button) : setActive("");
    active !== button ? setPopUp(true) : setPopUp(false);
    if (button === "Simpatisan") {
      setTabelTitle({ text: "Tambah Simpatisan", title: "Jumlah Simpatisan SJP Berkhidmat" });
    } else if (button === "Relawan") {
      setTabelTitle({ text: "Tambah Relawan", title: "Jumlah Relawan SJP Berkhidmat" });
    } else if (button === "Program") {
      setTabelTitle({ text: undefined, title: "Rencana Program " });
    } else if (button === "Logistik") {
      setTabelTitle({ text: undefined, title: "Persebaran Logistik" });
    }
  };

  //   console.log(relawan);

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
      <div style={popUp === false ? { visibility: "hidden" } : { visibility: "visible" }} className="z-50 phone:top phone:absolute phone:w-[780px] mt-[50px] laptop:absolute laptop:w-[975px]  bg-white  right-0 ">
        <div className="mt-[39px] ml-[49px]">
          <div className="flex justify-between items-center">
            <p className="text-[26px] text-[#374151] font-bold phone:mr-0 mr-[120px]">{tabelTitle.title}</p>
            <div className="flex items-center gap-8">
              <div style={tabelTitle.text === undefined ? { visibility: "collapse" } : {}}>
                <NewButton title={tabelTitle.text} style={styleBtn} />
              </div>

              <p className="text-[#E44700] text-[14px] underline cursor-pointer mr-[69px] phone:mr-6">Lihat Detail</p>
            </div>
          </div>
          <TabelPopUp data={relawan} />
        </div>
      </div>
    </>
  );
};

export default ButtonPopUpInfo;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon } from "../../utility/icon/icon";
import JumlahPenduduk from "../JumlahPenduduk";

const ButtonKecamatan = ({ data }) => {
  const [active, setActive] = useState();
  const [icon, setIcon] = useState();
  const [dataKecamatan, setDataKecamatan] = useState();
  const [nama, setNama] = useState("");
  const idKecamatan = data?.toString();

  const handleButton = (button) => {
    active !== button ? setActive(button) : setActive();
  };

  useEffect(() => {
    if (active === "Relawan") {
      setIcon(RelawanIcon);
    } else if (active === "Simpatisan") {
      setIcon(SimpatisanIcon);
    } else if (active === "Logistik") {
      setIcon(Logistic);
    } else if (active === "Program") {
      setIcon(ProgramIcon);
    } else {
      setIcon();
    }
  }, [handleButton]);

  useEffect(() => {
    if (idKecamatan === undefined) {
      console.log("loading");
    } else if (idKecamatan !== undefined) {
      const kecamatan = axios
        .get(`https://api.sjpberkhidmat.id/user//kelurahan/${idKecamatan}`)
        .then((res) => {
          setDataKecamatan(res.data.data);
          nama;
        })
        .catch((err) => console.log(err));
    }
  }, [idKecamatan]);

  console.log(nama);
  return (
    <>
      {" "}
      <div className="flex mt-8 gap-2">
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
      <div>
        {/* div popup */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] h-[45px] w-[349px] border-[#FFCFB9] border bg-white absolute z-50 left-[700px] top-[69px] rounded-md ">
          <div className="flex justify-start items-center gap-2">
            <p className={` text-[#374151] text-[21px] font-medium`}>{active === undefined ? <>Peta Kekuatan:</> : <>{active}:</>}</p>
            <p className={`text-[21px] text-[#374151] font-bold`}>Kec. Mataram</p>
          </div>
        </div>
        {/* pejanggik */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[920px] top-[290px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pejanggik</p>
          </div>
        </div>
        {/* mataram timur */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[830px] top-[400px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Mataram Timur</p>
          </div>
        </div>
        {/* pagesangan barat */}
        <div className="flex justify-center cursor-pointer items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[510px] top-[550px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagesangan Barat</p>
          </div>
        </div>
        {/* punia */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[600px] top-[420px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Punia</p>
          </div>
        </div>
        {/* pagesangan */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[790px] top-[590px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagesangan</p>
          </div>
        </div>
        {/* pagesangan timur */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[900px] top-[520px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagesangan Timur</p>
          </div>
        </div>
        {/* pagutan timur */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[900px] top-[720px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagutan Timur</p>
          </div>
        </div>
        {/* pagutan barat */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[630px] top-[690px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagutan Barat</p>
          </div>
        </div>
        {/* pagutan  */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[730px] top-[800px] rounded-md ">
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagutan </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonKecamatan;

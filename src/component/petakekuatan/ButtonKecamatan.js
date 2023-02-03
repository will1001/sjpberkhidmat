import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon } from "../../utility/icon/icon";
import JumlahPenduduk from "../JumlahPenduduk";

const ButtonKecamatan = ({ data, nama, setHover }) => {
  const router = useRouter();
  const [active, setActive] = useState();
  const [icon, setIcon] = useState();
  const [dataKecamatan, setDataKecamatan] = useState();

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
  }, [active]);

  useEffect(() => {
    if (idKecamatan) {
      const kecamatan = axios
        .get(`https://api.sjpberkhidmat.id/user//kelurahan/${idKecamatan}`)
        .then((res) => {
          setDataKecamatan(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [nama]);

  const detail = (nama, id) => {
    router.push({
      pathname: "/peta_kekuatan/DetailDesa",
      query: { desa: nama, id: id },
    });
  };

  // console.log(dataKecamatan);
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
      {/* kec. mataram */}
      <div className={`${nama?.toLowerCase() === "mataram" ? "visible" : "hidden"}`}>
        {/* div popup */}
        <div className="flex bg-white py-2 px-[14px] fixed gap-2 left-[700px] rounded-full top-[20px] border border-[#374151] text-[#374151] font-medium">
          {active === undefined ? <p>Peta Kekuatan:</p> : <p>{active}:</p>} <span className="text-[#374151] font-bold">Kec. Mataram</span>
        </div>
        {/* pejanggik */}
        <div
          onClick={() => detail("Pejanggik", "5271020005")}
          onMouseOutCapture={() => setHover("pejanggik")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[800px] cursor-pointer top-[70px] rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pejanggik</p>
          </div>
        </div>
        {/* mataram timur */}
        <div
          onClick={() => detail("Mataram Timur", "5271020002")}
          onMouseOutCapture={() => setHover("mataram timur")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[860px] top-[160px] cursor-pointer rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Mataram Timur</p>
          </div>
        </div>
        {/* pagesangan barat */}
        <div
          onClick={() => detail("Pagesangan Barat", "5271020003")}
          onMouseOutCapture={() => setHover("pagesangan barat")}
          onMouseLeave={() => setHover()}
          className="flex justify-center cursor-pointer items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[580px]  top-[280px] rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagesangan Barat</p>
          </div>
        </div>
        {/* punia */}
        <div
          onClick={() => detail("Punia", "5271020006")}
          onMouseOutCapture={() => setHover("punia")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[680px] top-[160px] cursor-pointer rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Punia</p>
          </div>
        </div>
        {/* pagesangan */}
        <div
          onClick={() => detail("Pagesangan", "5271020001")}
          onMouseOutCapture={() => setHover("pagesangan")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[820px] top-[300px] cursor-pointer rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagesangan</p>
          </div>
        </div>
        {/* pagesangan timur */}
        <div
          onClick={() => detail("Pagesangan Timur", "5271020004")}
          onMouseOutCapture={() => setHover("pagesangan timur")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[980px] top-[250px] cursor-pointer rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagesangan Timur</p>
          </div>
        </div>
        {/* pagutan timur */}
        <div
          onClick={() => detail("Pagutan Timur", "5271020009")}
          onMouseOutCapture={() => setHover("pagutan timur")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[950px] top-[390px] cursor-pointer rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagutan Timur</p>
          </div>
        </div>
        {/* pagutan barat */}
        <div
          onClick={() => detail("Pagutan Barat", "5271020008")}
          onMouseOutCapture={() => setHover("pagutan barat")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[700px] top-[360px] cursor-pointer rounded-md "
        >
          <div>
            <p className={`${icon === undefined ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === undefined ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Pagutan Barat</p>
          </div>
        </div>
        {/* pagutan  */}
        <div
          onClick={() => detail("Pagutan", "5271020007")}
          onMouseOutCapture={() => setHover("pagutan")}
          onMouseLeave={() => setHover()}
          className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[730px] top-[450px] cursor-pointer rounded-md "
        >
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

import React, { useEffect, useState } from "react";
import { Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon, TpsIcon } from "../utility/icon/icon";
import JumlahPenduduk from "./JumlahPenduduk";
import kotaIcon from "../utility/peta/kota_icon.png";
import relawan from "../utility/peta/relawan.png";
import logistik from "../utility/peta/logistik.png";
import simpatisan from "../utility/peta/simpatisan.png";
import program from "../utility/peta/program.png";
import useFetch from "../API/useFetch";
import axios from "axios";
import { useRouter } from "next/router";

const ButtonPopUpInfo = ({ type, data }) => {
  const router = useRouter();
  const [active, setActive] = useState();
  const [icon, setIcon] = useState(kotaIcon);

  const handleButton = (button) => {
    active !== button ? setActive(button) : setActive();
  };

  useEffect(() => {
    if (active === "Relawan") {
      setIcon(relawan);
    } else if (active === "Simpatisan") {
      setIcon(simpatisan);
    } else if (active === "Logistik") {
      setIcon(logistik);
    } else if (active === "Program") {
      setIcon(program);
    } else {
      setIcon(kotaIcon);
    }
  }, [handleButton]);

  const id_kabupaten = data?.toString();
  const [namaKecamatan, setNamaKecamatan] = useState();

  useEffect(() => {
    if (id_kabupaten === undefined) {
      console.log("loading");
    } else if (id_kabupaten !== undefined) {
      const kecamatan = axios
        .get(`https://api.sjpberkhidmat.id/user//kecamatan/${id_kabupaten}`)
        .then((res) => setNamaKecamatan(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [id_kabupaten]);

  const DetailKecamatan = (id, nama) => {
    router.push({
      pathname: "/peta_kekuatan/DetailKecamatan",
      query: { kecamatan: id, nama: nama },
    });
    // console.log(res);
  };

  console.log(namaKecamatan);

  return (
    <>
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

      {/* semua kab / kota */}
      <div className={`${type === "kab_kota" ? "visible" : "hidden"}`}>
        {/* div popup */}
        {/* lombok utara */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[700px] top-[110px] rounded-md ">
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Utara</p>
          </div>
        </div>
        {/* kota mataram */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[600px] top-[250px] rounded-md ">
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kota Mataram</p>
          </div>
        </div>
        {/* lombok barat */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[550px] top-[430px] rounded-md ">
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Barat</p>
          </div>
        </div>
        {/* lombok tengah */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[890px] top-[350px] rounded-md ">
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Tengah</p>
          </div>
        </div>
        {/* lombok timur */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[1000px] top-[230px] rounded-md ">
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Timur</p>
          </div>
        </div>
      </div>

      {/* detail mataram */}
      <div className={`${data === "5271" ? "visible" : "hidden"}`}>
        {/* div popup */}
        {/* ampenan */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[780px] top-[310px] rounded-md ">
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Ampenan</p>
          </div>
        </div>
        {/* sekarbela */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[500px] top-[590px] rounded-md ">
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Sekarbela</p>
          </div>
        </div>
        {/* mataram */}
        <div onClick={() => DetailKecamatan("5271020", "Mataram")} className="flex justify-center cursor-pointer items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[780px] top-[630px] rounded-md ">
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Mataram</p>
          </div>
        </div>
        {/* selaparang */}
        <div className="flex justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[490px] top-[350px] rounded-md ">
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Selaparang</p>
          </div>
        </div>
        {/* cakranegara */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[900px] top-[430px] rounded-md ">
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Cakranegara</p>
          </div>
        </div>
        {/* sandubaya */}
        <div className="flex justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white absolute z-50 left-[1000px] top-[560px] rounded-md ">
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>123.123</p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Sandubaya</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonPopUpInfo;

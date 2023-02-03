import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HomeIcon, KembaliIcon, Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon } from "../../utility/icon/icon";
import ProgressBar from "../../utility/ProgresBar";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";

const DetailDesaContent = ({ desa }) => {
  const router = useRouter();
  const [active, setActive] = useState();
  const [icon, setIcon] = useState();
  const persentase = (10 / 20) * 100;

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
  return (
    <>
      {/* popup */}
      <div className="fixed py-2  px-[14px] left-[700px] top-[20px] bg-white  rounded-full border  border-[#374151] text-[#374151] font-medium">
        <div className="flex  gap-2 ">
          {active === undefined ? <p>Peta Kekuatan:</p> : <p>{active}:</p>} <span className="text-[#374151] font-bold">{desa}</span>
        </div>
        <p className={`${active === undefined ? "hidden" : "visible"} flex justify-center text-[#FF5001]`}>451.231</p>
      </div>
      <div className="flex gap-3 my-2">
        <div onClick={() => router.back()}>
          <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
        </div>
        <div
          onClick={() =>
            router.push({
              pathname: "/Admin",
              query: { component: "Dashboard" },
            })
          }
          className="cursor-pointer"
        >
          <HomeIcon />
        </div>
      </div>
      <p className="text-[32px] text-[#374151] font-bold">{desa}</p>
      <div className="flex mt-3 gap-2">
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
      <p className="text-[18px] text-slate-700 font-bold mt-2">Real Count</p>
      <ProgressBar progress={persentase.toFixed()} bgcolor={"#FF5001"} height={"24px"} />
      <div className="mt-4 border-t-2">
        <div className="flex justify-between text[18px] text-[#374151] font-bold">
          <p className="w-[150px]">Target Simpatisan</p>
          <div className="flex gap-2">
            <p className="text-[#6B7280]">100.000 /</p>
            <p>200.000</p>
          </div>
        </div>
        <ProgressBar progress={persentase.toFixed()} bgcolor={"#FF5001"} height={"11px"} />
        <p className="flex">
          <span className="w-[180px] font-normal text-slate-700 text-[18px] mb-3">Suara Periode Lalu </span> <span className="text-[#374151] font-semibold text-[18px]">123.123</span>
        </p>
        <p className="flex">
          <span className="w-[180px] font-normal text-slate-700 text-[18px]">Jumlah DPT </span> <span className="text-[#374151] font-semibold text-[18px]">123.123</span>
        </p>
        <p className="flex ">
          <span className="w-[180px] font-normal text-slate-700 text-[18px]">Jumlah DPS </span> <span className="text-[#374151] font-semibold text-[18px]">123.123</span>
        </p>
        <p className="flex  mb-4">
          <span className="w-[180px] font-normal text-slate-700 text-[18px]">Jumlah TPS </span> <span className="text-[#374151] font-semibold text-[18px]">123.123 </span>
        </p>
      </div>
      <div className=" mt-4">
        <p className="flex justify-between">
          <span className="font-normal w-[160px] text-slate-700 text-[18px]">Relawan </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal w-[160px] text-slate-700 text-[18px]">Simpatisan </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
        <p className="flex  justify-between">
          <span className="font-normal w-[160px] text-slate-700 text-[18px]">Logistik </span> <span className="w-[100px] font-semibold text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal w-[160px] text-slate-700 text-[18px]">Program </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
      </div>
    </>
  );
};

export default DetailDesaContent;

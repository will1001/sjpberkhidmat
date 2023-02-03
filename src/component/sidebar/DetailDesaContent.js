import React, { useState } from "react";
import { DataPerdesaIcon, HomeIcon, KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";
import ProgressBar from "../../utility/ProgresBar";
import ContacRelawan from "../ContacRelawan";
import ButtonPopUpInfo from "../ButtonPopUpInfo";
import ButtonKecamatan from "../petakekuatan/ButtonKecamatan";
import { useRouter } from "next/router";

const DetailDesaContent = ({ data, nama, setHover }) => {
  const router = useRouter();
  const [active, setActive] = useState("hidden");
  const handleActive = () => {
    active === "hidden" ? setActive("visible") : setActive("hidden");
  };
  const persentase = (10 / 20) * 100;

  // console.log(nama);

  return (
    <>
      <div>
        <div className="flex gap-2 mb-4">
          <div onClick={() => router.back()}>
            <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
          </div>
        </div>
        <h1 className="text-[32px] font-bold text-slate-700">Kec. {nama}</h1>
        <ButtonKecamatan data={data?.id} nama={nama} setHover={setHover} />
        <p className="text-[18px] text-slate-700 font-bold mt-2">Real Count</p>
        <ProgressBar progress={persentase.toFixed()} bgcolor={"#FF5001"} height={"24px"} />
        <div className="mt-4 border-t-2">
          <div className="flex justify-between text[18px] text-[#374151] font-bold">
            <p className="w-[180px]">Target Simpatisan</p>
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
            <span className="font-normal w-[100px] text-slate-700 text-[18px]">Relawan </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
            <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
          </p>
          <p className="flex justify-between">
            <span className="font-normal w-[100px] text-slate-700 text-[18px]">Simpatisan </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
            <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
          </p>
          <p className="flex  justify-between">
            <span className="font-normal w-[100px] text-slate-700 text-[18px]">Logistik </span> <span className="w-[100px] font-semibold text-[18px] text-[#FF5001]">123.123</span>
            <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
          </p>
          <p className="flex justify-between">
            <span className="font-normal w-[100px] text-slate-700 text-[18px]">Program </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
            <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailDesaContent;

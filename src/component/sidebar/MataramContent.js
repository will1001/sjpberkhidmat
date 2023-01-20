import React, { useEffect, useState } from "react";
import { DataPerdesaIcon, KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";
import ProgressBar from "../../utility/ProgresBar";
import ButtonPopUpInfo from "../ButtonPopUpInfo";

const MataramContent = ({ data }) => {
  const persentase = (10 / 20) * 100;
  const [kecamatan, setKecamatan] = useState();

  console.log(data);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
        <Button title={"Data Per Desa"} text="white" icon={<DataPerdesaIcon />} bgColor={"#FF5001"} w={"211px"} h={"53px"} />
      </div>
      <h1 className="text-[32px] font-bold text-slate-700">Kota Mataram</h1>
      <ButtonPopUpInfo type={"mataram"} data={data} />
      <p className="text-[18px] text-slate-700 font-bold mt-2">Real Count</p>
      <ProgressBar progress={persentase.toFixed()} bgcolor={"#FF5001"} height={"24px"} />
      <div className="pr-16 mt-4">
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Penduduk </span> <span className="text-[#FF5001] font-semibold text-[18px]"> </span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Pemilih </span> <span className="text-[#FF5001] font-semibold text-[18px]"></span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah DPT </span> <span className="text-[#FF5001] font-semibold text-[18px]"> </span>
        </p>
        <p className="flex justify-between mb-4">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah TPS </span> <span className="text-[#FF5001] font-semibold text-[18px]"> </span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Relawan </span> <span className="text-[#FF5001] font-semibold text-[18px]"> </span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Simpatisan </span> <span className="text-[#FF5001] font-semibold text-[18px]"> </span>
        </p>
      </div>
      <div className="pr-16 mt-4">
        <p className="text-[18px] text-slate-700 font-bold">Profil Pengurus</p>
        <p className="flex gap-4">
          <span className="font-normal text-slate-700 text-[18px]">MPW </span> <span className="font-normal italic text-[18px] text-slate-700"></span>
        </p>
        <p className="flex gap-4">
          <span className="font-normal text-slate-700 text-[18px]">DPW </span> <span className="font-normal italic text-[18px] text-slate-700"></span>
        </p>
        <p className="flex gap-4">
          <span className="font-normal text-slate-700 text-[18px]">DSW </span> <span className="font-normal italic text-[18px] text-slate-700"></span>
        </p>
      </div>
    </div>
  );
};

export default MataramContent;

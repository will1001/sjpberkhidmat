import React, { useEffect, useState } from "react";
import { DataPerdesaIcon, KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";
import ProgressBar from "../../utility/ProgresBar";
import ButtonPopUpInfo from "../ButtonPopUpInfo";
import { useRouter } from "next/router";

const MataramContent = ({ data }) => {
  const persentase = (10 / 20) * 100;
  const [nama, setNama] = useState();
  const router = useRouter();

  const id_kabupaten = data?.toString();
  console.log(id_kabupaten);

  const namaKabupaten = () => {
    if (id_kabupaten === "5271") {
      setNama("Kota Mataram");
    } else if (id_kabupaten === "5203") {
      setNama("Kab. Lombok Timur");
    } else if (id_kabupaten === "5201") {
      setNama("Kab. Lombok Barat");
    } else if (id_kabupaten === "5202") {
      setNama("Kab. Lombok Tengah");
    } else if (id_kabupaten === "5208") {
      setNama("Kab. Lombok Timur");
    }
  };

  useEffect(() => {
    namaKabupaten();
  }, []);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div onClick={() => router.back()}>
          <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
        </div>

        <Button title={"Data Per Desa"} text="white" icon={<DataPerdesaIcon />} bgColor={"#FF5001"} w={"211px"} h={"53px"} />
      </div>
      <h1 className="text-[32px] font-bold text-slate-700">{nama}</h1>
      <ButtonPopUpInfo data={id_kabupaten} />
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
        <p className="flex ">
          <span className="font-normal w-[180px] text-slate-700 text-[18px]">Relawan </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
        <p className="flex ">
          <span className="font-normal w-[180px] text-slate-700 text-[18px]">Simpatisan </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
        <p className="flex  ">
          <span className="font-normal w-[180px] text-slate-700 text-[18px]">Logistik </span> <span className="w-[100px] font-semibold text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
        <p className="flex ">
          <span className="font-normal w-[180px] text-slate-700 text-[18px]">Program </span> <span className="w-[100px] font-semibold  text-[18px] text-[#FF5001]">123.123</span>
          <span className="text-[16px] text-[#FF5001] underline cursor-pointer">Lihat Detail</span>
        </p>
      </div>
    </div>
  );
};

export default MataramContent;

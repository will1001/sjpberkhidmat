import React from "react";
import { DataPerdesaIcon, KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";
import ProgressBar from "../../utility/ProgresBar";

const MataramContent = ({ data }) => {
  const persentase = (data?.jumlahPemilih / data?.jumlahPenduduk) * 100;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
          <Button title={"Data Per Desa"} text="white" icon={<DataPerdesaIcon />} bgColor={"#FF5001"} w={"211px"} h={"53px"} />
      </div>
      <h1 className="text-[32px] font-bold text-slate-700">Kota Mataram</h1>
      <div className="flex mt-8 justify-between">
        <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
        <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
      </div>
      <div className="flex  mt-4 justify-between">
        <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
        <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
      </div>
      <p className="text-[18px] text-slate-700 font-bold mt-2">Persentase Kekuatan</p>
      <ProgressBar progress={persentase.toFixed()} bgcolor={"#FF5001"} height={"24px"} />
      <div className="pr-16 mt-4">
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Penduduk </span> <span className="text-[#FF5001] font-semibold text-[18px]"> {data?.jumlahPenduduk.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Pemilih </span> <span className="text-[#FF5001] font-semibold text-[18px]"> {data?.jumlahPemilih.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah DPT </span> <span className="text-[#FF5001] font-semibold text-[18px]"> {data?.jumlahDPT.toLocaleString()}</span>
        </p>
        <p className="flex justify-between mb-4">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah TPS </span> <span className="text-[#FF5001] font-semibold text-[18px]"> {data?.jumlahTPS.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Relawan </span> <span className="text-[#FF5001] font-semibold text-[18px]"> {data?.jumlahRelawan.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-normal text-slate-700 text-[18px]">Jumlah Simpatisan </span> <span className="text-[#FF5001] font-semibold text-[18px]"> {data?.jumlahSimpatisan.toLocaleString()}</span>
        </p>
      </div>
      <div className="pr-16 mt-4">
        <p className="text-[18px] text-slate-700 font-bold">Profil Pengurus</p>
        <p className="flex gap-4">
          <span className="font-normal text-slate-700 text-[18px]">MPW </span> <span className="font-normal italic text-[18px] text-slate-700">{data?.profilPengurus.MPW}</span>
        </p>
        <p className="flex gap-4">
          <span className="font-normal text-slate-700 text-[18px]">DPW </span> <span className="font-normal italic text-[18px] text-slate-700">{data?.profilPengurus.DPW}</span>
        </p>
        <p className="flex gap-4">
          <span className="font-normal text-slate-700 text-[18px]">DSW </span> <span className="font-normal italic text-[18px] text-slate-700">{data?.profilPengurus.DSW}</span>
        </p>
      </div>
      <div className="pr-16 mt-4">
        <p className="text-[18px] text-slate-700 font-bold">Daftar Kecamatan</p>
        <ul className="list-disc list-inside mb-12">
          {data?.kecamatan.map((res, i) => {
            return (
              <li key={i} className="font-normal text-slate-700">
                {res.nama}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MataramContent;

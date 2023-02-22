import { useRouter } from "next/router";
import React from "react";
import { KembaliIcon } from "../../src/utility/icon/icon";

const DetailKelurahan = () => {
  const router = useRouter();
  return (
    <>
      <div className="p-[40px] text-[#374151]">
        <div className="flex">
          <div onClick={() => router.back()} className="bg-[#374151] flex items-center gap-1 py-2 px-4 rounded-md cursor-pointer">
            <div className="h-[20px] w-[20px] flex items-center">
              <KembaliIcon />
            </div>
            <p className="text-white font-semibold">Kembali</p>
          </div>
        </div>
        <p className="text-[32px] font-bold mt-[42px]">Peta Kekuatan Per Desa / Kelurahan</p>
        <div className="flex mt-[24px] pr-[228px] justify-between">
          <div>
            <p className="text-[#9CA3AF] font-medium">NAMA KABUPATEN / KOTA</p>
            <select className="border border-[#9CA3AF] text-[18px] font-semibold mt-[16px] outline-0 cursor-pointer w-full px-2 py-2 rounded-md">
              <option value={"Mataram"}>Mataram</option>
            </select>
          </div>
          <div>
            <p className="text-[#9CA3AF] font-medium">DAFTAR KECAMATAN</p>
            <select className="border border-[#9CA3AF] text-[18px] font-semibold mt-[16px] outline-0 cursor-pointer w-full px-2 py-2 rounded-md">
              <option value={"Mataram"}>Semua Kecamatan</option>
            </select>
          </div>
          <div>
            <p className="text-[#9CA3AF] font-medium">DATA TARGET</p>
            <div className="flex gap-2">
              <p className="text-[18px] font-bold">Target Simpatisan</p>
              <p className="text-[#6B7280] text-[18px]">122.1233</p>/<p className="font-semibold text-[18px]">123.123</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-[#D1D5DB]">
                <div className="bg-[#FF5001] h-[7px] text-[#FF5001] text-[1px] w-[95%]">a</div>
              </div>
              <p className="text-[18px] font-semibold">95%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailKelurahan;

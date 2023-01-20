import React, { useEffect, useState } from "react";
import inputImg from "../../../utility/img/InputCalon&Partai.png";
import batalImg from "../../../utility/icon/batal.png";
import nextImg from "../../../utility/icon/next.png";
import InputPartai from "./InputPartai";
import useFetch from "../../../API/useFetch";
import ListPartai from "./ListPartai";
import { useRouter } from "next/router";

const TambahPartai = () => {
  const containerStyle = {
    background: "#FFFFFF",
    boxShadow: "0px 8px 21px rgba(0, 0, 0, 0.08)",
    borderRadius: "4px",
  };

  const getPartai = useFetch("get", "user/real_count/partai");
  const [popUp, setPopUp] = useState(false);

  console.log(getPartai);
  const router = useRouter();

  return (
    <div style={containerStyle} className="mx-[80px] mt-[55px]">
      <img src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + "user/real_count/partai"} />
      <p className="flex justify-center text-[32px] text-[#374151] font-bold pt-[42px]">Input Calon & Partai</p>
      <p className="flex justify-center text-[#374151] pt-[10px]">Periode 2024 - 2029</p>
      <div className="flex justify-center pt-[40px]">
        <img src={inputImg.src} alt="proses_input.png" />
      </div>
      {getPartai?.data?.map((res, index) =>
        res === undefined ? (
          <p>Loading.........</p>
        ) : (
          <div key={res._id} className={`mx-[110px] mt-[12px]`}>
            <ListPartai title={res.name} nomor={index + 1} logo={res.logo} />
          </div>
        )
      )}
      <div className={`mx-[110px] mt-[12px] ${popUp === false ? "hidden" : "visible"}`}>
        <InputPartai getPartai={getPartai} />
      </div>
      <div onClick={() => setPopUp(true)} className="h-[72px] mx-[110px] border border-[#D1D5DB] cursor-pointer rounded-md bg-white items-center flex justify-center mt-[72px]">
        <p className="text-[21px] text-[#E44700] font-medium">+ Tambah Partai</p>
      </div>
      <div className="flex items-center justify-between mx-[110px] mt-[28px] pb-[76px]">
        <div className="h-[55px] border border-[#9CA3AF] rounded-md cursor-pointer flex items-center pl-[24px] pr-[32px]">
          <div>
            <img src={batalImg.src} alt="batal.png" />
          </div>
          <p className="text-[26px] text-[#374151]">Batal Input</p>
        </div>
        {getPartai?.data?.length === 0 ? (
          <div className="h-[55px] opacity-30 bg-[#E44700] rounded-md flex items-center pl-[24px] pr-[32px]">
            <p className="text-[26px] text-white mr-[12px ]">Selanjutnya</p>
            <div className="flex items-center">
              <img src={nextImg.src} alt="next.png" />
            </div>
          </div>
        ) : (
          <div onClick={() => router.push("real_count/InputCalon")} className="h-[55px] cursor-pointer bg-[#E44700] rounded-md flex items-center pl-[24px] pr-[32px]">
            <p className="text-[26px] text-white mr-[12px ]">Selanjutnya</p>
            <div className="flex items-center">
              <img src={nextImg.src} alt="next.png" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TambahPartai;
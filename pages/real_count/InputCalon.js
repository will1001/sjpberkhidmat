import React, { useEffect, useState } from "react";
import inputImg from "../../src/utility/img/step2.png";
import backIcon from "../../src/utility/icon/backIcn.png";
import nextImg from "../../src/utility/icon/next.png";
import AddCalon from "../../src/component/admin/realcount/AddCalon";
import useFetch from "../../src/API/useFetch";
import { useRouter } from "next/router";

const InputCalon = () => {
  const containerStyle = {
    background: "#FFFFFF",
    boxShadow: "0px 8px 21px rgba(0, 0, 0, 0.08)",
    borderRadius: "4px",
  };
  const router = useRouter();

  const [popUp, setPopUp] = useState(false);

  const getCalon = useFetch("get", "user/real_count/calon");

  //   console.log(getCalon);
  return (
    <div style={containerStyle} className="mx-[80px] mt-[55px]">
      <img src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + "user/real_count/partai"} />
      <p className="flex justify-center text-[32px] text-[#374151] font-bold pt-[42px]">Input Calon & Partai</p>
      <p className="flex justify-center text-[#374151] pt-[10px]">Periode 2024 - 2029</p>
      <div className="flex justify-center pt-[40px]">
        <img src={inputImg.src} alt="proses_input.png" />
      </div>
      {getCalon?.data?.map((res, index) =>
        res === undefined ? (
          <p>Loading.........</p>
        ) : (
          <div key={res._id} className={`mx-[110px] mt-[12px]`}>
            <AddCalon nama={res.name} nomor={index + 1} logo={res.logo} partai={res.id_partai} />
          </div>
        )
      )}

      <div className={`mx-[110px] mt-[12px] ${popUp === false ? "hidden" : "visible"}`}>
        <AddCalon nomor={undefined} nama={undefined} logo={undefined} partai={undefined} />
      </div>

      <div onClick={() => setPopUp(true)} className="h-[72px] mx-[110px] border border-[#D1D5DB] cursor-pointer rounded-md bg-white items-center flex justify-center mt-[72px]">
        <p className="text-[21px] text-[#E44700] font-medium">+ Tambah Calon</p>
      </div>
      <div className="flex items-center justify-between mx-[110px] mt-[28px] pb-[76px]">
        <div onClick={() => router.back()} className="h-[55px] border border-[#9CA3AF] rounded-md cursor-pointer flex items-center pl-[24px] pr-[32px]">
          <div>
            <img src={backIcon.src} alt="batal.png" />
          </div>
          <p className="text-[26px] text-[#374151] ml-2">Kembali</p>
        </div>
        {getCalon?.data?.length === 0 ? (
          <div className="h-[55px] opacity-30 bg-[#E44700] rounded-md flex items-center pl-[24px] pr-[32px]">
            <p className="text-[26px] text-white mr-[12px ]">Selanjutnya</p>
            <div className="flex items-center">
              <img src={nextImg.src} alt="next.png" />
            </div>
          </div>
        ) : (
          <div onClick={() => router.push("SelesaiInput")} className="h-[55px] cursor-pointer bg-[#E44700] rounded-md flex items-center pl-[24px] pr-[32px]">
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

export default InputCalon;

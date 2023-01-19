import React, { useEffect, useState } from "react";
import inputImg from "../../src/utility/img/selesai.png";
import backIcon from "../../src/utility/icon/backIcn.png";
import nextImg from "../../src/utility/icon/next.png";
import textNotif from "../../src/utility/img/textNotif.png";
import berhasil from "../../src/utility/img/berhasil_input.png";
import useFetch from "../../src/API/useFetch";
import { useRouter } from "next/router";

const SelesaiInput = () => {
  const containerStyle = {
    background: "#FFFFFF",
    boxShadow: "0px 8px 21px rgba(0, 0, 0, 0.08)",
    borderRadius: "4px",
  };
  const router = useRouter();

  const [popUp, setPopUp] = useState(true);

  const getCalon = useFetch("get", "user/real_count/calon");

  //   console.log(getCalon);
  return (
    <>
      <div className={`bg-slate-400 bg-opacity-50 absolute w-screen top-0 h-[1100px] ${popUp === true ? "visible" : "hidden"}`}>
        <div className="h-[455px] rounded-md w-[620px] ml-[416px] mt-[120px] bg-white absolute">
          <div onClick={() => setPopUp(false)} className="h-[24px] w-[24] pr-2  absolute top-0 right-0 text-[24px] font-semibold text-[#9CA3AF] cursor-pointer">
            X
          </div>
          <div className="flex justify-center mt-[30px]">
            <img src={berhasil.src} alt="berhasil.png" />
          </div>
          <div className="text-[32px] text-[#374151] font-bold flex flex-col items-center justify-center pt-[32px] pb-[16px]">
            <p>Input Data Calon & </p>
            <p>Partai, Berhasil</p>
          </div>
          <p className="text-[#374151] flex justify-center pb-[32px]"> Anda sudah bisa menggunakan fitur real count</p>
          <div className="flex justify-center items-center gap-8">
            <>
              <div
                onClick={() =>
                  router.push({
                    pathname: "/Admin",
                    query: "component=RealCount",
                  })
                }
                className="cursor-pointer w-[184px] h-[49px] bg-[#FF5001] rounded-sm flex items-center justify-center"
              >
                <p className="text-[18px] text-[#fff] font-semibold">Ok</p>
              </div>
            </>
          </div>
        </div>
      </div>
      <div style={containerStyle} className="mx-[80px] mt-[55px]">
        <p className="flex justify-center text-[32px] text-[#374151] font-bold pt-[42px]">Input Calon & Partai</p>
        <p className="flex justify-center text-[#374151] pt-[10px]">Periode 2024 - 2029</p>
        <div className="flex justify-center pt-[40px]">
          <img src={inputImg.src} alt="proses_input.png" />
        </div>
        <div className="flex justify-center pt-[40px]">
          <img src={textNotif.src} alt="proses_input.png" />
        </div>

        <div className="flex items-center justify-between mx-[110px] mt-[28px] pb-[76px]">
          <div onClick={() => router.back()} className="h-[55px] border border-[#9CA3AF] rounded-md cursor-pointer flex items-center pl-[24px] pr-[32px]">
            <div>
              <img src={backIcon.src} alt="batal.png" />
            </div>
            <p className="text-[26px] text-[#374151] ml-2">Kembali</p>
          </div>

          <div onClick={() => setPopUp(true)} className="h-[55px] cursor-pointer bg-[#E44700] rounded-md flex items-center pl-[24px] pr-[32px]">
            <p className="text-[26px] text-white mr-[12px ]">Simpan Data</p>
            <div className="flex items-center">
              <img src={nextImg.src} alt="next.png" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelesaiInput;

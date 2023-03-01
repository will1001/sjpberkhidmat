import React, { useState } from "react";
import publikasiProgram from "../../utility/img/publikasiProgram.png";
import berhasilImg from "../../utility/img/berhasiPost.png";
import { useRouter } from "next/router";

const PopupBerhasil = ({ popUp, setPopUp, berhasil, setBerhasil, post }) => {
  const router = useRouter();

  return (
    <>
      {" "}
      <div className={`bg-slate-400 bg-opacity-50 z-50 absolute w-screen top-0 h-[1100px] ${popUp === true ? "visible" : "hidden"}`}>
        <div className="h-[410px] w-[620px] ml-[416px] mt-[120px] bg-white absolute">
          <div onClick={() => setPopUp(false)} className="h-[24px] w-[24] pr-2  absolute top-0 right-0 text-[24px] font-semibold text-[#9CA3AF] cursor-pointer">
            X
          </div>
          <div className="flex justify-center mt-[30px]">{berhasil === false ? <img src={publikasiProgram.src} alt="publikasi_program.png" /> : <img src={berhasilImg.src} alt="berhasil.png" />}</div>
          <p className="text-[32px] text-[#374151] font-bold flex justify-center pt-[32px] pb-[16px]">{berhasil === false ? "Publikasikan Program?" : "Publikasi Berhasil"}</p>
          <p className="text-[#374151] flex justify-center pb-[32px]">{berhasil === false ? "anda akan menambahkan data program" : "Program telah ditambakan"}</p>
          <div className="flex justify-center items-center gap-8">
            {berhasil === false ? (
              <>
                <div onClick={() => setPopUp(false)} className="cursor-pointer w-[184px] h-[49px] border border-[#9CA3AF] rounded-sm flex items-center justify-center">
                  <p className="text-[18px] text-[#374151] font-semibold">Batal</p>
                </div>
                <div onClick={post} className="cursor-pointer w-[184px] h-[49px] bg-[#FF5001] rounded-sm flex items-center justify-center">
                  <p className="text-[18px] text-[#fff] font-semibold">Publikasikan</p>
                </div>
              </>
            ) : (
              <div
                onClick={() =>
                  router.push({
                    pathname: "../Admin",
                    query: { component: "/publikasi" },
                  })
                }
                className="cursor-pointer w-[184px] h-[49px] bg-[#FF5001] rounded-sm flex items-center justify-center"
              >
                <p className="text-[18px] text-[#fff] font-semibold">OK</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupBerhasil;

import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import daftarRelawan from "../../utility/img/daftar_relawan_berhasil.png";
import NewButton from "../NewButton";

const DaftarRelawanBerhasil = ({ router, props }) => {
  const [popUp, setPopUp] = useState(props);
  useEffect(() => {
    setPopUp(props);
    console.log(popUp);
  }, [props]);

  // button style popUp daftar
  const berhasiDaftar = {
    padding: "12px 28px",
    color: "#FFFFFF",
    width: "184px",
    height: "48px",
    background: "#E44700",
    borderRadius: "4px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
  };

  return (
    <div style={popUp === false ? { visibility: "hidden" } : { background: "rgba(55, 65, 81, 0.32)", visibility: "visible" }} className="fixed w-screen h-screen top-0 left-0">
      <div className="absolute bg-white w-[609px] h-[455px] mt-[120px] ml-[416px] rounded-md">
        <div onClick={() => setPopUp(false)} className="absolute cursor-pointer right-0 top-0 w-[24px] h-[24px] text-[24px] font-semibold text-[#9CA3AF]">
          X
        </div>
        <div className="mt-[37px]">
          <div className="flex justify-center">
            <img src={daftarRelawan.src} alt="success.png" />
          </div>
          <p className="flex justify-center font-bold text-[32px] text-[#374151] mt-[32px]">Daftar Relawan Berhasil</p>
          <div className="text-[18px] text-[#374151] mt-[16px]">
            <p className="flex items-center justify-center">Selamat bergabung menjadi relawan.</p>
            <p className="flex items-center justify-center">Mari Berkolaborasi untuk menjalankan program</p>
            <p className="flex items-center justify-center">pemerintah daerah bersama SJP Berkhidmat.</p>
          </div>
          <div
            onClick={() =>
              router.push({
                pathname: "/Admin",
                query: { component: "Relawan" },
              })
            }
            className="flex justify-center mt-[32px]"
          >
            <NewButton title={"OK"} style={berhasiDaftar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DaftarRelawanBerhasil);

import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import daftarBerhasilImg from "../../utility/img/pop_up_success.png";
import NewButton from "../NewButton";

const DaftarSuccess = ({ props, router }) => {
  const [popUp, setPopUp] = useState(false);
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
            <img src={daftarBerhasilImg.src} alt="success.png" />
          </div>
          <p className="flex justify-center font-bold text-[32px] text-[#374151] mt-[32px]">Daftar Simpatisan Berhasil</p>
          <div className="text-[18px] text-[#374151] mt-[16px]">
            <p className="flex items-center justify-center">Selamat bergabung bersama SJP Berkhidmat.</p>
            <p className="flex items-center justify-center">Mari bersama menjadi bagian perubahan</p>
            <p className="flex items-center justify-center">Pulau Lombok yang lebih baik.</p>
          </div>
          <div
            onClick={() =>
              router.push({
                pathname: "/Admin",
                query: { component: "Simpatisan" },
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

export default withRouter(DaftarSuccess);

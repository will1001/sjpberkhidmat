import { useRouter, withRouter } from "next/router";
import React, { useState } from "react";
import Relawan from "../src/component/daftar_akun/Relawan";
import Simpatisan from "../src/component/daftar_akun/Simpatisan";
import Logo from "../src/utility/Logo";

const Daftar = () => {
  const boxShadow = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
    borderRadius: "4px",
  };

  const router = useRouter();

  const [switchDaftar, setSwitchDaftar] = useState(router.query.type);
  const handleSwitch = (i) => setSwitchDaftar(i);

  return (
    <div
      style={boxShadow}
      className="mt-[42px] shadow-md mx-[278px] w-[884px] h-[1136px] pl-[65px]"
    >
      <div className="flex items-center">
        <div>
          <Logo />
        </div>
        <p className="text-[26px] font-bold text-[#374151] pl-[61px]">
          Mari Bergabung Menjadi Anggota <br />{" "}
          <span className="text-[#FF5001]">SJP Berkhidmat </span>
          Membangun Negeri
        </p>
      </div>
      <div className="flex my-[51px] font-medium text-[18px] text-[#374151] cursor-pointer">
        <p
          onClick={() => handleSwitch("simpatisan")}
          className={`${
            switchDaftar === "simpatisan"
              ? "text-[#FF5001]  border-b-2 border-[#FF5001]"
              : ""
          } mr-[33px] pb-[12px] `}
        >
          Daftar Simpatisan
        </p>
        <p
          onClick={() => handleSwitch("relawan")}
          className={`${
            switchDaftar === "relawan"
              ? "text-[#FF5001]  border-b-2 border-[#FF5001]"
              : ""
          } mr-[33px] pb-[12px] `}
        >
          Daftar Relawan
        </p>
      </div>
      {switchDaftar === "simpatisan" ? <Simpatisan /> : <Relawan />}
    </div>
  );
};

export default withRouter(Daftar);

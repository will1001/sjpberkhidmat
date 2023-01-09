import React from "react";
import { PendudukIcon } from "../../../utility/icon/icon";

const JumlahDptDps = () => {
  return (
    <div className="flex w-[272px] h-[79px] border border-[#FF9666] rounded-md items-center gap-3 px-[16px] stroke-[#374151] text-[#374151]">
      <PendudukIcon />
      <p className="">
        <span className="text-[#FF5001] text-[32px] font-bold">153.121</span>
        <br />
        <span className="text-[21px] font-medium leading-none">Jumlah Penduduk</span>
      </p>
    </div>
  );
};

export default JumlahDptDps;

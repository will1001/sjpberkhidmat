import React, { useState } from "react";
import RealCountPenduduk from "./realcount/RealCountPenduduk";
import ProgresBar from "../../utility/ProgresBar";
import AlertInput from "./realcount/AlertInput";

const RealCount = () => {
  const [activ, setActive] = useState("button1");
  const activhandle = (button) => {
    if (button !== activ) setActive(button);
    else setActive("");
  };

  return (
    <div className="p-8 ml-2">
      <p className="text-[32px] font-bold text-slate-700">Real Count DPR RI Dapil II Prov. NTB</p>
      <RealCountPenduduk />
      <ProgresBar bgcolor={"#E44700"} progress={0} title={"Jumlah Suara Masuk"} />
      <p className="font-bold text-slate-700 text-[18px]">Perolehan Suara Sementara</p>
      <div className="flex gap-4 pt-4 pb-4">
        <button
          onClick={() => activhandle("button1")}
          className={activ === "button1" ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl` : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`}
        >
          Partai
        </button>
        <button
          onClick={() => activhandle("button2")}
          className={activ === "button2" ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl` : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`}
        >
          Calon DPR RI
        </button>
      </div>
      <AlertInput />
      <button className="mt-4 w-[220px] h-[42px] bg-[#E44700] text-white text-[18px] font-semibold rounded-md">Input Calon & Partai</button>
    </div>
  );
};

export default RealCount;

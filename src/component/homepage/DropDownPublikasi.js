import React, { useState } from "react";
import KabarTerbaru from "./KabarTerbaru";

const DropDownPublikasi = () => {
  const [selected, setSelected] = useState("button1");

  const setSelectedButton = (button) => {
    if (button !== selected) setSelected(button);
    else setSelected("");
  };

  return (
    <div className={` absolute w-[1350px] h-[5200px] z-20 bg-opacity-50 bg-slate-600`}>
      <div className="flex h-[554px] border-t-2 bg-white">
        <div className={` w-[367px] pt-[30px] pl-[70px]`}>
          <button id="1" onClick={() => setSelectedButton("button1")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button1" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"} `}>
            Bantuan Sosial
          </button>
          <button id="2" onClick={() => setSelectedButton("button2")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button2" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"} `}>
            Infrastruktur
          </button>
          <button id="3" onClick={() => setSelectedButton("button3")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button3" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"} `}>
            Pendidikan
          </button>
          <button id="4" onClick={() => setSelectedButton("button4")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button4" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"} `}>
            Lapangan Kerja
          </button>
          <button id="5" onClick={() => setSelectedButton("button5")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button5" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"}  `}>
            Peraturan Daerah
          </button>
          <button id="6" onClick={() => setSelectedButton("button6")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button6" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"}  `}>
            Ormas & Keagamaan
          </button>
          <button id="7" onClick={() => setSelectedButton("button7")} className={`flex justify-start items-center h-[48px] w-[170px] font-semibold ${selected === "button7" ? "bg-[#FFECE4] text-[#FF5001]" : "bg-white text-[#374151]"} `}>
            Kesehatan
          </button>
        </div>
        <div className="flex flex-col pt-[57px] gap-2">
          <KabarTerbaru />
          <KabarTerbaru />
          <KabarTerbaru />
          <KabarTerbaru />
        </div>
        <div className="flex flex-col pt-[57px] gap-2 pl-[91px]">
          <KabarTerbaru />
          <KabarTerbaru />
          <KabarTerbaru />
          <KabarTerbaru />
        </div>
      </div>
    </div>
  );
};

export default DropDownPublikasi;
